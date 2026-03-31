import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { UserRole } from '@prisma/client'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Admin panel protection
    if (pathname.startsWith('/admin')) {
      if (token?.role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Artist dashboard protection
    if (pathname.startsWith('/artist')) {
      if (token?.role !== UserRole.ARTIST && token?.role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    // Client dashboard protection
    if (pathname.startsWith('/client')) {
      if (token?.role !== UserRole.CLIENT && token?.role !== UserRole.ADMIN) {
        return NextResponse.redirect(new URL('/auth/signin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // Public routes that don't need a token
        if (
          pathname === '/' ||
          pathname.startsWith('/auth') ||
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/_next') ||
          pathname.startsWith('/favicon.ico')
        ) {
          return true
        }
        // Everything else needs a token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public assets)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
