'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  BarChart3, 
  Users, 
  CheckCircle, 
  ShieldAlert, 
  Music, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Cpu
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession, signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

const menuItems = [
  { name: 'System Analytics', href: '/admin', icon: BarChart3 },
  { name: 'User Directory', href: '/admin/users', icon: Users },
  { name: 'Artist Approvals', href: '/admin/approvals', icon: CheckCircle },
  { name: 'Event Monitor', href: '/admin/events', icon: Music },
  { name: 'Disputes & Bans', href: '/admin/disputes', icon: ShieldAlert },
  { name: 'System Config', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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
             <span className="bg-gold text-charcoal text-[10px] font-bold px-1.5 py-0.5 rounded-sm">ADMIN</span>
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

          {/* System Health Snippet */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-4">
             <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                <span>System Health</span>
                <span className="text-green-400">Stable</span>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-black/20 text-center">
                   <div className="text-xs font-bold text-white">99.9%</div>
                   <div className="text-[8px] text-white/20 uppercase tracking-tighter">Uptime</div>
                </div>
                <div className="p-2 rounded-lg bg-black/20 text-center">
                   <div className="text-xs font-bold text-white">24ms</div>
                   <div className="text-[8px] text-white/20 uppercase tracking-tighter">Latency</div>
                </div>
             </div>
          </div>

          {/* User Profile */}
          <div className="pt-8 border-t border-gold/10 space-y-4">
             <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10 border-2 border-gold/30">
                  <AvatarImage src={session?.user?.image || ''} />
                  <AvatarFallback className="bg-gold/10 text-gold uppercase">
                    {(session?.user?.name || 'A').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col overflow-hidden">
                   <span className="text-sm font-bold text-white truncate">{session?.user?.name}</span>
                   <span className="text-[10px] text-gold font-bold uppercase tracking-widest uppercase italic">Master Controller</span>
                </div>
             </div>
             <button
               onClick={() => signOut({ callbackUrl: '/' })}
               className="w-full flex items-center space-x-4 px-4 py-3 text-red-400 hover:bg-red-400/5 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
             >
                <LogOut size={18} />
                <span>Terminate Session</span>
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
                 Velqora <span className="text-gold italic">Control Center</span>
              </h2>
           </div>

           <div className="flex items-center space-x-6">
              <div className="hidden sm:flex items-center space-x-3 px-4 py-2 bg-red-400/10 border border-red-400/20 rounded-full text-red-400">
                 <Cpu size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Sync Active</span>
              </div>
              
              <button className="relative w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/30 transition-all">
                 <Bell size={20} />
                 <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-charcoal" />
              </button>
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
