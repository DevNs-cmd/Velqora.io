import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import { UserRole } from '@prisma/client'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token
    
    // 1. Role-based redirection logic for protected routes
    if (pathname.startsWith('/admin') && token?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    
    if (pathname.startsWith('/artist') && token?.role !== UserRole.ARTIST && token?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }
    
    if (pathname.startsWith('/client') && token?.role !== UserRole.CLIENT && token?.role !== UserRole.ADMIN) {
      return NextResponse.redirect(new URL('/auth/signin', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Define public routes
        const isPublicPath = 
          pathname === '/' ||
          pathname.startsWith('/auth') ||
          pathname.startsWith('/api/auth') ||
          pathname.startsWith('/_next') ||
          pathname.includes('.') // for images, icons, etc.
          
        if (isPublicPath) return true
        
        // Everything else requires a token
        return !!token
      },
    },
  }
)

export const config = {
  matcher: [
    '/admin/:path*',
    '/artist/:path*',
    '/client/:path*',
    '/auth/:path*',
  ],
}
