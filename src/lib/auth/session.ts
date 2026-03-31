'use client'

import { useSession } from 'next-auth/react'
import { UserRole } from '@prisma/client'

export function useAuth() {
  const { data: session, status, update } = useSession()

  return {
    session,
    status,
    update,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    user: session?.user,
    role: session?.user?.role as UserRole | undefined,
    isClient: session?.user?.role === UserRole.CLIENT,
    isArtist: session?.user?.role === UserRole.ARTIST,
    isAdmin: session?.user?.role === UserRole.ADMIN,
  }
}

export function useHasRole(role: UserRole) {
  const { session } = useSession()
  return session?.user?.role === role
}

export function useCanAccessArtistDashboard() {
  const { session } = useSession()
  return (
    session?.user?.role === UserRole.ARTIST &&
    session?.user?.isArtistApproved
  )
}
