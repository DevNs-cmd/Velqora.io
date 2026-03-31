import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// POST /api/events - Create new event request
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== UserRole.CLIENT) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, eventType, description, budget, date, location, vibe, guestCount, notes } = body

    const event = await prisma.event.create({
      data: {
        title,
        eventType,
        description,
        budget,
        date: new Date(date),
        location,
        vibe,
        guestCount,
        notes,
        clientId: session.user.id,
        status: 'PENDING',
      },
    })

    // START MATCHING LOGIC (Mock)
    // Find artists that match the budget and genre
    const matchedArtists = await prisma.artist.findMany({
      where: {
        isApproved: true,
        genres: {
          hasSome: vibe,
        },
      },
      take: 10,
    })

    if (matchedArtists.length > 0) {
      await prisma.event.update({
        where: { id: event.id },
        data: {
          matchedArtists: matchedArtists.map((a) => a.id),
          status: 'MATCHING',
        },
      })
    }

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Create event error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// GET /api/events - Get events (Client: their own, Admin: all, Artist: matched)
export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  try {
    const role = session.user.role

    let where: any = {}
    if (status) where.status = status

    if (role === UserRole.CLIENT) {
      where.clientId = session.user.id
    } else if (role === UserRole.ARTIST) {
      // Find events where this artist is matched
      const artist = await prisma.artist.findUnique({
        where: { userId: session.user.id },
      })
      if (!artist) return NextResponse.json([])
      
      where.matchedArtists = { has: artist.id }
    } else if (role === UserRole.ADMIN) {
      // No extra filtering for admin
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        client: {
          select: { name: true, image: true },
        },
        offers: {
           include: { artist: true }
        }
      },
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Get events error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
