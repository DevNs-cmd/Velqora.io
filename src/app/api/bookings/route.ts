import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// POST /api/bookings - Client accepts an offer and creates a booking
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { offerId } = await req.json()

    // Find offer and associated event
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
      include: {
        event: true,
        artist: true,
      },
    })

    if (!offer) {
      return NextResponse.json({ error: 'Offer not found' }, { status: 404 })
    }

    // Verify event ownership
    if (offer.event.clientId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized event' }, { status: 403 })
    }

    // Create booking and update statuses in a transaction
    const booking = await prisma.$transaction(async (tx) => {
      // 1. Create booking
      const newBooking = await tx.booking.create({
        data: {
          eventId: offer.eventId,
          artistId: offer.artistId,
          finalPrice: offer.price,
          totalAmount: offer.price * 1.1, // Platform fee 10%
          platformFee: offer.price * 0.1,
          status: 'PENDING_PAYMENT',
          paymentStatus: 'PENDING_PAYMENT',
        },
      })

      // 2. Update offer status to ACCEPTED
      await tx.offer.update({
        where: { id: offerId },
        data: { status: 'ACCEPTED', respondedAt: new Date() },
      })

      // 3. Mark all other offers for this event as REJECTED
      await tx.offer.updateMany({
        where: { 
          eventId: offer.eventId,
          NOT: { id: offerId }
        },
        data: { status: 'REJECTED', respondedAt: new Date() },
      })

      // 4. Update event status
      await tx.event.update({
        where: { id: offer.eventId },
        data: { status: 'BOOKED' },
      })

      return newBooking
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Create booking error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// GET /api/bookings - Get user's bookings (Client or Artist)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    let where: any = {}
    if (session.user.role === UserRole.CLIENT) {
      where.event = { clientId: session.user.id }
    } else if (session.user.role === UserRole.ARTIST) {
       const artist = await prisma.artist.findUnique({
        where: { userId: session.user.id },
      })
      if (!artist) return NextResponse.json([])
      where.artistId = artist.id
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        event: true,
        artist: {
          include: {
            user: { select: { name: true, image: true } }
          }
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Get bookings error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
