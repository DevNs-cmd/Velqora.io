'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  BarChart3,
  Users,
  CheckCircle2,
  ShieldAlert,
  Music,
  Settings,
  LogOut,
  Menu,
  Bell,
  Cpu,
  Shield,
  ChevronRight,
  Eye,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Video } from '@/components/ui/Video'

const menuItems = [
  { name: 'System Analytics', href: '/admin', icon: BarChart3, badge: null, danger: false },
  { name: 'User Directory', href: '/admin/users', icon: Users, badge: null, danger: false },
  { name: 'Artist Approvals', href: '/admin/approvals', icon: CheckCircle2, badge: '3', danger: false },
  { name: 'Event Monitor', href: '/admin/events', icon: Music, badge: null, danger: false },
  { name: 'Disputes & Bans', href: '/admin/disputes', icon: ShieldAlert, badge: '1', danger: true },
  { name: 'System Config', href: '/admin/settings', icon: Settings, badge: null, danger: false },
]

const systemAlerts = [
  { text: 'Dispute #DIS-882 needs immediate attention', level: 'red' },
  { text: '"The Midnight Echoes" — High priority artist application', level: 'gold' },
  { text: 'Automated AI matching running for 12 events', level: 'blue' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'admin' | 'client_view' | 'artist_view'>('admin')
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  const activeLabel = menuItems.find(m => m.href === pathname)?.name ?? 'System Analytics'

  return (
    <div className="min-h-screen bg-[#06060a] selection:bg-[#D4AF37] selection:text-[#06060a] text-white font-sans">

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

      {/* VIEW MODE BANNER */}
      <AnimatePresence>
        {viewMode !== 'admin' && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[60] flex items-center justify-between px-6 py-2"
            style={{
              background: viewMode === 'client_view'
                ? 'rgba(59,130,246,0.85)'
                : 'rgba(212,175,55,0.85)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <div className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
              <Eye size={14} />
              {viewMode === 'client_view' ? 'Viewing as: CLIENT' : 'Viewing as: ARTIST'}
              <span className="opacity-60">— Read-only admin perspective</span>
            </div>
            <button
              onClick={() => setViewMode('admin')}
              className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest border border-white/30 px-3 py-1 rounded-lg"
            >
              Exit View
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ──────────────────────────────────────────── */}
      <aside
        className={cn(
          'fixed bottom-0 w-[280px] z-50 transition-transform duration-500 ease-in-out transform lg:translate-x-0 flex flex-col',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          viewMode !== 'admin' ? 'top-10' : 'top-0'
        )}
        style={{
          background: 'linear-gradient(170deg, #0c0a14 0%, #06060a 50%, #06060f 100%)',
          borderRight: '1px solid rgba(139,92,246,0.15)',
        }}
      >
        {/* VIDEO strip — with purple tint for admin identity */}
        <div className="relative h-36 overflow-hidden flex-shrink-0">
          <Video
            src="/ballroom.mp4"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            style={{ filter: 'hue-rotate(270deg) saturate(0.6)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(139,92,246,0.1)] to-[#06060a]" />
          {/* Live pulse */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-red-400">LIVE</span>
          </div>
          <div className="absolute bottom-4 left-5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)' }}>
              <Shield size={14} style={{ color: '#a78bfa' }} />
            </div>
            <div>
              <span className="text-xs font-bold tracking-[.4em]" style={{ color: '#a78bfa' }}>VELQORA</span>
              <div className="text-[9px] text-white/30 tracking-widest uppercase">Control Center</div>
            </div>
          </div>
        </div>

        {/* System Alerts Strip */}
        <div className="px-4 py-3 space-y-2 flex-shrink-0"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {systemAlerts.map((alert, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 flex-shrink-0 rounded-full ${
                alert.level === 'red' ? 'bg-red-400' : alert.level === 'gold' ? 'bg-[#D4AF37]' : 'bg-blue-400'
              }`} />
              <p className="text-[9px] text-white/30 font-bold leading-tight truncate">{alert.text}</p>
            </div>
          ))}
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
                  'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group',
                  isActive
                    ? 'text-white shadow-[0_0_18px_rgba(139,92,246,0.2)]'
                    : item.danger
                      ? 'text-red-400/50 hover:text-red-400 hover:bg-red-400/5'
                      : 'text-white/35 hover:text-white hover:bg-white/5'
                )}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(109,40,217,0.2))',
                  border: '1px solid rgba(139,92,246,0.3)',
                } : {}}
              >
                <item.icon
                  size={18}
                  className={cn('flex-shrink-0 transition-all',
                    isActive ? 'text-[#a78bfa]' : item.danger ? 'text-red-400/50' : 'text-[#a78bfa]/40 group-hover:text-[#a78bfa]'
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className={cn(
                    'text-[10px] font-bold px-2 py-0.5 rounded-full',
                    item.danger ? 'bg-red-400/15 text-red-400' : 'bg-[#a78bfa]/15 text-[#a78bfa]'
                  )}>
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>

        {/* ADMIN SUPERPOWER: Portal Switcher */}
        <div className="mx-4 mb-4 p-4 rounded-2xl flex-shrink-0 space-y-3"
          style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.15)' }}>
          <div className="text-[9px] font-bold uppercase tracking-widest text-[#a78bfa]/60 flex items-center gap-2">
            <Eye size={10} />
            Admin View Switch
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => router.push('/client')}
              className={cn(
                'text-[10px] font-bold py-2 rounded-xl uppercase tracking-widest transition-all',
                'bg-white/5 text-white/30 border border-white/10 hover:text-blue-300 hover:bg-blue-500/10'
              )}
            >
              Client View
            </button>
            <button
              onClick={() => router.push('/artist')}
              className={cn(
                'text-[10px] font-bold py-2 rounded-xl uppercase tracking-widest transition-all',
                'bg-white/5 text-white/30 border border-white/10 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
              )}
            >
              Artist View
            </button>
          </div>
        </div>

        {/* System Health */}
        <div className="mx-4 mb-4 p-4 rounded-2xl flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/25">System Health</span>
            <span className="text-[9px] font-bold uppercase tracking-widest text-green-400">Stable</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="text-xs font-bold text-white">99.9%</div>
              <div className="text-[8px] text-white/20 uppercase tracking-tighter">Uptime</div>
            </div>
            <div className="p-2 rounded-lg text-center" style={{ background: 'rgba(0,0,0,0.3)' }}>
              <div className="text-xs font-bold text-white">24ms</div>
              <div className="text-[8px] text-white/20 uppercase tracking-tighter">Latency</div>
            </div>
          </div>
        </div>

        {/* PROFILE FOOTER */}
        <div className="p-4 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-2xl mb-3"
            style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
            <Avatar className="h-9 w-9 border-2" style={{ borderColor: 'rgba(139,92,246,0.4)' }}>
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback className="text-sm font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
                {(session?.user?.name || 'A').charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-bold text-white truncate">{session?.user?.name ?? 'Admin'}</div>
              <div className="text-[9px] font-bold uppercase tracking-widest" style={{ color: '#a78bfa' }}>Master Controller</div>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400/60 hover:text-red-400 hover:bg-red-400/5 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* ─── MAIN ──────────────────────────────────────────────── */}
      <div className={cn('lg:ml-[280px] flex flex-col min-h-screen', viewMode !== 'admin' && 'pt-10')}>

        {/* TOPBAR */}
        <header
          className="h-16 sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10"
          style={{
            background: 'rgba(6,6,10,0.92)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(139,92,246,0.1)',
          }}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}
            >
              <Menu size={18} style={{ color: '#a78bfa' }} />
            </button>
            <div className="hidden lg:block">
              <h2 className="text-sm font-bold text-white/35 tracking-widest uppercase">
                Control Center <span style={{ color: '#a78bfa' }}>/ {activeLabel}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Sync */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171' }}>
              <Cpu size={11} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Sync</span>
            </div>

            {/* Admin Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)', color: '#a78bfa' }}>
              <Shield size={11} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Admin</span>
            </div>

            {/* Bell */}
            <button className="relative w-9 h-9 rounded-full flex items-center justify-center text-white/35 transition-all"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#06060a]" />
            </button>

            <Avatar className="h-9 w-9 border-2 cursor-pointer" style={{ borderColor: 'rgba(139,92,246,0.4)' }}>
              <AvatarImage src={session?.user?.image || ''} />
              <AvatarFallback className="text-xs font-bold" style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}>
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
