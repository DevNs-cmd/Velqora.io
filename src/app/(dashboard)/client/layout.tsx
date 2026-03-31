'use client'

import React, { useState, useRef } from 'react'
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
  User,
  Bell,
  Sparkles,
  Shield,
  ChevronRight,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Video } from '@/components/ui/Video'

const menuItems = [
  { name: 'Dashboard', href: '/client', icon: LayoutDashboard, badge: null },
  { name: 'New Request', href: '/client/requests/new', icon: PlusCircle, badge: null },
  { name: 'My Requests', href: '/client/requests', icon: Music, badge: '3' },
  { name: 'Bookings', href: '/client/bookings', icon: Calendar, badge: '1' },
  { name: 'Transactions', href: '/client/transactions', icon: CreditCard, badge: null },
  { name: 'Settings', href: '/client/settings', icon: Settings, badge: null },
]

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const activeLabel = menuItems.find(m => m.href === pathname)?.name ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-[#0a0a0a] selection:bg-[#D4AF37] selection:text-[#0a0a0a] text-white font-sans">

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─────────────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 w-[280px] z-50 transition-transform duration-500 ease-in-out transform lg:translate-x-0 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          background: 'linear-gradient(160deg, #0f0f0f 0%, #0a0a0a 60%, #0d0b06 100%)',
          borderRight: '1px solid rgba(212,175,55,0.12)',
        }}
      >
        {/* VIDEO strip at sidebar top */}
        <div className="relative h-32 overflow-hidden flex-shrink-0">
          <Video
            src="/concert.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center">
              <Sparkles size={14} className="text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-[.4em] text-[#D4AF37]">VELQORA</span>
              <div className="text-[9px] text-white/30 tracking-widest uppercase">Client Portal</div>
            </div>
          </div>
        </div>

        {/* NAV */}
        <div className="flex-1 px-4 py-4 space-y-1 overflow-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-4 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#b8960c] text-[#0a0a0a] shadow-[0_0_20px_rgba(212,175,55,0.25)]'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon
                  size={18}
                  className={cn('transition-all', isActive ? 'text-[#0a0a0a]' : 'text-[#D4AF37]/50 group-hover:text-[#D4AF37]')}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center',
                    isActive ? 'bg-[#0a0a0a]/30 text-[#0a0a0a]' : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                  )}>
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight size={14} className="text-[#0a0a0a]/60" />}
              </Link>
            )
          })}
        </div>

        {/* PROFILE FOOTER */}
        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/8 transition-all mb-3">
            <Avatar className="h-9 w-9 border border-[#D4AF37]/30">
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback className="bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-bold">
                {(session?.user?.name || 'C').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{session?.user?.name ?? 'Client'}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]/60">Platinum Member</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN ────────────────────────────────────────────────── */}
      <div className="lg:ml-[280px] flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header
          className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10"
          style={{
            background: 'rgba(10,10,10,0.85)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(212,175,55,0.08)',
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)' }}
            >
              <Menu size={18} className="text-[#D4AF37]" />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-sm font-bold text-white/40 tracking-widest uppercase">
                Client Portal <span className="text-[#D4AF37]">/ {activeLabel}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Member tag */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}
            >
                <Sparkles size={11} />
                Platinum Member
              </div>

              {/* ADMIN RETURN */}
              {session?.user?.role === 'ADMIN' && (
                <Link href="/admin">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 hover:bg-violet-500/20 transition-all cursor-pointer">
                    <Shield size={11} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#a78bfa]">Admin Console</span>
                  </div>
                </Link>
              )}

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#D4AF37] rounded-full border-2 border-[#0a0a0a]" />
            </button>

            {/* Profile */}
            <Link href="/client/settings">
              <Avatar className="h-9 w-9 border border-[#D4AF37]/30 cursor-pointer hover:border-[#D4AF37]/60 transition-all">
                <AvatarImage src={session?.user?.image || ''} />
                <AvatarFallback className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold">
                  {(session?.user?.name || 'C').charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
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
