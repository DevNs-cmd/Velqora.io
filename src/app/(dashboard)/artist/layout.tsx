'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  UserCircle,
  Search,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  Bell,
  Sparkles,
  ChevronRight,
  Shield,
  Music,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const menuItems = [
  { name: 'Dashboard', href: '/artist', icon: LayoutDashboard, badge: null },
  { name: 'Profile & Portfolio', href: '/artist/profile', icon: UserCircle, badge: null },
  { name: 'Request Feed', href: '/artist/feed', icon: Search, badge: '8' },
  { name: 'My Offers', href: '/artist/offers', icon: MessageSquare, badge: '2' },
  { name: 'Earnings', href: '/artist/earnings', icon: DollarSign, badge: null },
  { name: 'Settings', href: '/artist/settings', icon: Settings, badge: null },
]

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const activeLabel = menuItems.find(m => m.href === pathname)?.name ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-[#080808] selection:bg-[#D4AF37] selection:text-[#080808] text-white font-sans">

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─────────────────────────────────── */}
      <aside
        className={cn(
          'fixed top-0 left-0 bottom-0 w-[280px] z-50 transition-transform duration-500 ease-in-out transform lg:translate-x-0 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          background: 'linear-gradient(160deg, #0c0c08 0%, #080808 50%, #0a0c08 100%)',
          borderRight: '1px solid rgba(212,175,55,0.1)',
        }}
      >
        {/* VIDEO STRIP — dj footage */}
        <div className="relative h-36 overflow-hidden flex-shrink-0">
          <video
            src="/dj.mov"
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#080808]" />
          <div className="absolute top-4 right-4">
            <div className="px-2 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
              style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80' }}>
              ● Live Available
            </div>
          </div>
          <div className="absolute bottom-4 left-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)' }}>
              <Music size={14} className="text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-xs font-bold tracking-[.4em] text-[#D4AF37]">VELQORA</span>
              <div className="text-[9px] text-white/30 tracking-widest uppercase">Artist Lounge</div>
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
                  'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#b8960c] text-[#080808] shadow-[0_0_18px_rgba(212,175,55,0.2)]'
                    : 'text-white/35 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon
                  size={18}
                  className={cn('flex-shrink-0', isActive ? 'text-[#080808]' : 'text-[#D4AF37]/50 group-hover:text-[#D4AF37]')}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full',
                    isActive ? 'bg-[#080808]/25 text-[#080808]' : 'bg-[#D4AF37]/15 text-[#D4AF37]'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* Earnings snippet */}
        <div className="mx-4 mb-4 p-4 rounded-2xl flex-shrink-0"
          style={{ background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212,175,55,0.12)' }}>
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/25 mb-1">This Month</div>
          <div className="text-xl font-serif font-bold text-[#D4AF37]">$3,280</div>
          <div className="text-[9px] text-green-400/70 font-bold uppercase tracking-wider mt-0.5">+22% vs last month</div>
        </div>

        {/* PROFILE FOOTER */}
        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 mb-3">
            <Avatar className="h-9 w-9 border border-[#D4AF37]/30">
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback className="bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-bold">
                {(session?.user?.name || 'A').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{session?.user?.name ?? 'Artist'}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest text-[#D4AF37]">★ Verified Artist</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN ──────────────────────────────────────── */}
      <div className="lg:ml-[280px] flex flex-col min-h-screen">

        {/* TOPBAR */}
        <header
          className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10"
          style={{
            background: 'rgba(8,8,8,0.9)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(212,175,55,0.07)',
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
              <h2 className="text-sm font-bold text-white/35 tracking-widest uppercase">
                Artist Lounge <span className="text-[#D4AF37]">/ {activeLabel}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Response time badge */}
            <div
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.18)', color: '#D4AF37' }}
            >
              <Sparkles size={10} />
              Avg. Response: 2h
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
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-white/35 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#080808]" />
            </button>

            <Avatar className="h-9 w-9 border border-[#D4AF37]/30 cursor-pointer">
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold">
                {(session?.user?.name || 'A').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
