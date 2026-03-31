import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// POST /api/offers - Send an offer for an event
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== UserRole.ARTIST) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { eventId, price, message, media } = body

    // Verify artist profile exists
    const artist = await prisma.artist.findUnique({
      where: { userId: session.user.id },
    })

    if (!artist || !artist.isApproved) {
      return NextResponse.json({ error: 'Artist profile not found or not approved' }, { status: 403 })
    }

    // Verify event exists and artist is matched
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (!event.matchedArtists.includes(artist.id)) {
      return NextResponse.json({ error: 'Artist is not matched with this event' }, { status: 403 })
    }

    // Create the offer
    const offer = await prisma.offer.create({
      data: {
        eventId,
        artistId: artist.id,
        price: parseFloat(price),
        message,
        media,
        status: 'PENDING',
      },
    })

    // Update event status
    await prisma.event.update({
      where: { id: eventId },
      data: { status: 'OFFERS_RECEIVED' },
    })

    return NextResponse.json(offer, { status: 201 })
  } catch (error: any) {
    console.error('Create offer error:', error)
    if (error?.code === 'P2002') {
       return NextResponse.json({ error: 'You have already sent an offer for this event' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
