'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  PlusCircle, 
  Music, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  User,
  Bell
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const menuItems = [
  { name: 'Dashboard', href: '/client', icon: LayoutDashboard },
  { name: 'New Request', href: '/client/requests/new', icon: PlusCircle },
  { name: 'My Requests', href: '/client/requests', icon: Music },
  { name: 'Bookings', href: '/client/bookings', icon: Calendar },
  { name: 'Transactions', href: '/client/transactions', icon: CreditCard },
  { name: 'Settings', href: '/client/settings', icon: Settings },
]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal font-sans text-white">
      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside
        className={cn(
          "fixed top-0 left-0 bottom-0 w-72 bg-charcoal-dark border-r border-gold/10 z-50 transition-transform duration-300 transform lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-8 space-y-12">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
             <span className="text-2xl font-serif font-bold tracking-[.3em] text-gold">
               VELQORA
             </span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                    isActive 
                      ? "bg-gold text-charcoal shadow-[0_0_15px_rgba(212,175,55,0.3)]" 
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} className={cn(
                    "transition-transform group-hover:scale-110",
                    isActive ? "text-charcoal" : "text-gold/60"
                  )} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="pt-8 border-t border-gold/10 space-y-4">
             <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10 border-2 border-gold/30">
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback className="bg-gold/10 text-gold uppercase">
                    {(session?.user?.name || 'C').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                   <span className="text-sm font-bold text-white truncate">{session?.user?.name}</span>
                   <span className="text-[10px] text-gold/60 font-bold uppercase tracking-widest uppercase">Client Member</span>
                </div>
             </div>
             <button
               onClick={() => signOut({ callbackUrl: '/' })}
               className="w-full flex items-center space-x-4 px-4 py-3 text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
             >
                <LogOut size={18} />
                <span>Sign Out</span>
             </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="lg:ml-72 flex flex-col min-h-screen">
        {/* TOPBAR */}
        <header className="h-20 bg-charcoal-dark/50 backdrop-blur-md border-b border-gold/10 sticky top-0 z-30 px-6 sm:px-10 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gold"
              >
                 <Menu size={20} />
              </button>
              <h2 className="text-xl font-serif font-bold text-white lg:block hidden">
                 Welcome to the <span className="text-gold italic">Concierge</span>
              </h2>
           </div>

           <div className="flex items-center space-x-6">
              <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all">
                 <Bell size={20} />
                 <span className="absolute top-0 right-0 w-3 h-3 bg-gold rounded-full border-2 border-charcoal" />
              </button>
              
              <Link href="/client/settings">
                 <Button variant="ghost" className="hidden sm:flex items-center space-x-2 text-white/60 hover:text-gold hover:bg-gold/5 focus:ring-0">
                   <User size={18} />
                   <span className="text-xs font-bold uppercase tracking-widest">My Profile</span>
                 </Button>
              </Link>
           </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-6 sm:p-10 flex-1 overflow-x-hidden">
           {children}
        </main>
      </div>
    </div>
  )
}
