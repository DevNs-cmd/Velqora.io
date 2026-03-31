'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, LogOut, ChevronDown, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function Navbar() {
  const { data: session } = useSession()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Artists', href: '#artists' },
    { name: 'About', href: '#about' },
    { name: 'Concierge', href: '#concierge' },
    { name: 'Contact', href: '#contact' },
  ]

  const dashboardHref = session?.user?.role === 'ADMIN' 
    ? '/admin' 
    : session?.user?.role === 'ARTIST' 
      ? '/artist' 
      : '/client'

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b',
        isScrolled 
          ? 'bg-charcoal/80 backdrop-blur-md border-gold/20' 
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-2 group h-12 w-12 rounded-full border border-gold/30 overflow-hidden relative bg-black shadow-lg">
          <Image 
            src="/logo.jpg" 
            alt="Velqora Logo" 
            fill 
            className="object-contain p-1 group-hover:scale-110 transition-transform"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* AUTH BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          {session ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white/70 hover:text-gold">
                <Bell size={20} />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 hover:bg-transparent flex items-center space-x-2 focus:ring-0">
                    <Avatar className="h-9 w-9 border-2 border-gold/30">
                      <AvatarImage src={session.user?.image || ''} />
                      <AvatarFallback className="bg-gold/10 text-gold uppercase">
                        {(session.user?.name || 'U').charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-xs">
                      <span className="text-white font-semibold">{session.user?.name}</span>
                      <span className="text-gold opacity-80 text-[10px] uppercase tracking-tighter">
                        {session.user?.role}
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-gold" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-charcoal-light border-gold/20 text-white shadow-2xl">
                  <DropdownMenuLabel className="font-serif">My Velqora</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gold/10" />
                  <DropdownMenuItem asChild className="hover:bg-gold/10 cursor-pointer">
                    <Link href={dashboardHref}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-gold/10 cursor-pointer">
                    Profile Settings
                  </DropdownMenuItem>
                  {session.user.role === 'CLIENT' && (
                    <DropdownMenuItem asChild className="hover:bg-gold/10 cursor-pointer">
                      <Link href="/client/bookings">My Bookings</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="bg-gold/10" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-400/10 cursor-pointer"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="ghost" className="text-white/80 hover:text-gold hover:bg-gold/5 border border-transparent hover:border-gold/20 transition-all">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signin">
                <Button className="bg-gradient-gold hover:brightness-110 text-charcoal font-bold px-6 shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">
                  Book Now
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-charcoal border-b border-gold/10 p-6 flex flex-col space-y-4 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/80 hover:text-gold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 flex flex-col space-y-4">
              {!session ? (
                <>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold/10">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-gold text-charcoal">Get Started</Button>
                  </Link>
                </>
              ) : (
                <Link href={dashboardHref} onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gold text-charcoal">Go to Dashboard</Button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
