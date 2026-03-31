import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

// PATCH /api/admin/approve-artist - Admin approves an artist profile
export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { artistId, approve, reason } = await req.json()

    const artist = await prisma.artist.update({
      where: { id: artistId },
      data: {
        isApproved: approve,
      },
      include: {
        user: { select: { email: true } },
      },
    })

    // Record action for audit trail
    await prisma.adminAction.create({
      data: {
        adminId: session.user.id,
        actionType: approve ? 'APPROVE_ARTIST' : 'REJECT_ARTIST',
        targetUserId: artist.userId,
        targetId: artist.id,
        reason,
      },
    })

    return NextResponse.json({ 
       message: approve ? 'Artist approved successfully' : 'Artist rejected',
       artist 
    })
  } catch (error) {
    console.error('Approve artist error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
