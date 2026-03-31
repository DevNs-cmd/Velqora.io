import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Demo Access',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "demo@velqora.com" },
        name: { label: "Name", type: "text", placeholder: "Demo User" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email) return null

        try {
          // 1. Try real database logic
          let user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            user = await prisma.user.create({
              data: {
                email: credentials.email,
                name: credentials.name || 'Demo User',
                role: (credentials.role as UserRole) || UserRole.CLIENT,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
              }
            })
          } else if (credentials.role && user.role !== (credentials.role as UserRole)) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: { role: credentials.role as UserRole }
            })
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
          }
        } catch (error) {
          console.warn('⚠️ Database not reachable (Prisma). Falling back to MOCK AUTH for testing.')
          // 2. Fallback to MOCK user for smooth demo
          return {
            id: 'mock-user-id',
            name: credentials.name || 'Demo User',
            email: credentials.email,
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&h=250&auto=format&fit=crop',
            role: (credentials.role as UserRole) || UserRole.CLIENT,
          }
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        })

        if (existingUser) {
          // Update user info if needed
          await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              name: user.name || existingUser.name,
              image: user.image || existingUser.image,
            },
          })
        }
      }
      return true
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name
        token.image = user.image
      }

      // Handle session update
      if (trigger === 'update' && session) {
        token.name = session.name || token.name
        token.image = session.image || token.image
      }

      // Fetch latest user data on every JWT refresh (RESILIENT)
      if (token.id && token.id !== 'mock-user-id') {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            include: { artistProfile: true },
          })

          if (dbUser) {
            token.role = dbUser.role
            token.name = dbUser.name
            token.image = dbUser.image
            token.hasArtistProfile = !!dbUser.artistProfile
            token.isArtistApproved = dbUser.artistProfile?.isApproved || false
          }
        } catch (error) {
          console.warn('⚠️ Token Refresh: Database inaccessible. Using token cache.')
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.image as string
        session.user.hasArtistProfile = token.hasArtistProfile as boolean
        session.user.isArtistApproved = token.isArtistApproved as boolean
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      // Create user notification or welcome email
      console.log('User created:', user.email)
    },
  },
}

// Extend next-auth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: UserRole
      email: string
      name: string | null
      image: string | null
      hasArtistProfile: boolean
      isArtistApproved: boolean
    }
  }

  interface User {
    role: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: UserRole
    hasArtistProfile: boolean
    isArtistApproved: boolean
  }
}
