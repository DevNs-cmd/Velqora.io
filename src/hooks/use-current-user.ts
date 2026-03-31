'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export function useCurrentUser() {
  const { data: session, status } = useSession()
  const [user, setUser] = useState(session?.user)

  useEffect(() => {
    setUser(session?.user)
  }, [session])

  return {
    user,
    isLoading: status === 'loading',
    isAuthenticated: status === 'authenticated',
  }
}
