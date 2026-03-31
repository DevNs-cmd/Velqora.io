import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// GET /api/artists - List all approved artists for search
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const genre = searchParams.get('genre')

  try {
    const artists = await prisma.artist.findMany({
      where: {
        isApproved: true,
        genres: genre ? { has: genre } : undefined,
      },
      include: {
        user: {
          select: { name: true, image: true },
        },
      },
    })

    return NextResponse.json(artists)
  } catch (error) {
    console.error('Get artists error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

// POST /api/artists - Create/Update artist profile
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { bio, genres, performanceType, pricing, experience, location, profileImage, portfolioImages, videos } = body

    const artist = await prisma.artist.upsert({
      where: { userId: session.user.id },
      update: {
        bio,
        genres,
        performanceType,
        pricing,
        experience,
        location,
        profileImage,
        portfolioImages,
        videos,
      },
      create: {
        userId: session.user.id,
        bio,
        genres,
        performanceType,
        pricing,
        experience,
        location,
        profileImage,
        portfolioImages,
        videos,
      },
    })

    // Update user role if not already artist
    if (session.user.role !== UserRole.ARTIST && session.user.role !== UserRole.ADMIN) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { role: UserRole.ARTIST },
      })
    }

    return NextResponse.json(artist)
  } catch (error) {
    console.error('Update artist profile error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
