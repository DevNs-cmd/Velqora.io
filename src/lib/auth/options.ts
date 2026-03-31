import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { UserRole } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as unknown as NextAuthOptions['adapter'],
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: UserRole.CLIENT, // Default role
        }
      },
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

      // Fetch latest user data on every JWT refresh
      if (token.id) {
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
