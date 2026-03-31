'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  DollarSign,
  Star,
  ArrowRight,
  Calendar,
  CheckCircle2,
  MessageSquare,
  Search,
  Plus,
  Play,
  TrendingUp,
  Music,
  Users,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Video } from '@/components/ui/Video'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export default function ArtistDashboardPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Maestro'

  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: DollarSign, accent: '#D4AF37' },
    { label: 'Upcoming Shows', value: '4', icon: Calendar, accent: '#fff' },
    { label: 'Profile Views', value: '1,240', icon: TrendingUp, accent: '#D4AF37' },
    { label: 'Avg. Rating', value: '4.98 ★', icon: Star, accent: '#4ade80' },
  ]

  const newRequests = [
    {
      id: 'REQ-45',
      client: 'Mansion Party — Beverly Hills',
      date: 'Oct 12, 2026',
      budget: '$2,500 – $4,000',
      description: 'Soulful Jazz trio needed for luxury garden party. 150 guests. Formal attire.',
      guestCount: 150,
      match: '98%',
    },
    {
      id: 'REQ-48',
      client: 'Tech Summit Afterparty',
      date: 'Nov 05, 2026',
      budget: '$5,000+',
      description: 'High-energy DJ with live percussionist for closing night celebration.',
      guestCount: 300,
      match: '94%',
    },
  ]

  const upcomingGigs = [
    { title: 'Grand Gala — Dubai', date: 'Apr 10', status: 'CONFIRMED' },
    { title: 'Corporate Summit', date: 'Apr 22', status: 'CONFIRMED' },
    { title: 'Private Birthday', date: 'May 08', status: 'PENDING' },
  ]

  return (
    <div className="space-y-10">

      {/* ── HERO ────────────────────────────────────── */}
      <motion.section {...fadeUp(0)} className="relative rounded-3xl overflow-hidden min-h-[260px] flex items-end">
        <Video
          src="/dj.mov"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        <div className="absolute top-6 right-6 w-40 h-40 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 70%)' }} />

        <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(74,222,128,0.1)', border: '1px solid rgba(74,222,128,0.3)' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-bold tracking-[.3em] text-green-400 uppercase">Available for Bookings</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Showtime,{' '}
              <span className="italic" style={{ color: '#D4AF37' }}>{firstName}</span>
            </h1>
            <p className="text-white/45 text-base font-light leading-relaxed">
              Your stage is set. Explore curated event requests matched to your style and craft.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <Link href="/artist/feed">
                <Button className="h-12 px-8 font-bold text-sm tracking-widest uppercase"
                  style={{ background: 'linear-gradient(135deg,#D4AF37,#b8960c)', color: '#080808' }}>
                  <Search size={15} className="mr-2" />
                  Find Gigs
                </Button>
              </Link>
              <Link href="/artist/profile">
                <Button variant="ghost" className="h-12 px-6 text-white/50 hover:text-white text-sm font-bold uppercase tracking-widest hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                  My Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(0.1 + i * 0.08)}
                className="p-4 rounded-2xl flex flex-col gap-2 min-w-[115px]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <s.icon size={17} style={{ color: s.accent }} />
                <div className="text-xl font-bold text-white font-serif">{s.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/25">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── MAIN GRID ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT: Request Feed */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-white">Curated Requests</h2>
            <Link href="/artist/feed"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#D4AF37]/70 group">
              Full Feed <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {newRequests.map((req, i) => (
              <motion.div
                key={req.id}
                {...fadeUp(0.15 + i * 0.1)}
                className="rounded-2xl overflow-hidden group"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                {/* Match band */}
                <div className="px-6 pt-5 pb-0 flex items-center justify-between">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/25">{req.id}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                    <Star size={10} className="text-[#D4AF37]" />
                    <span className="text-[10px] font-bold text-[#D4AF37]">{req.match} Match</span>
                  </div>
                </div>

                <div className="p-6 flex flex-col sm:flex-row gap-5">
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="text-lg font-bold text-white leading-snug">{req.client}</div>
                      <p className="text-xs text-white/35 mt-1 leading-relaxed line-clamp-2">{req.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-wider text-white/30">
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-[#D4AF37]" />{req.date}</span>
                      <span className="flex items-center gap-1.5"><Users size={11} className="text-[#D4AF37]" />{req.guestCount} guests</span>
                      <span className="flex items-center gap-1.5"><DollarSign size={11} className="text-[#D4AF37]" />{req.budget}</span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between items-end gap-3 sm:border-l sm:border-white/5 sm:pl-5 flex-shrink-0">
                    <Link href={`/artist/feed/${req.id}`} className="w-full">
                      <Button className="w-full text-[10px] font-bold uppercase tracking-widest h-10 px-5 min-w-[120px]"
                        style={{ background: 'linear-gradient(135deg,#D4AF37,#b8960c)', color: '#080808' }}>
                        Send Offer
                      </Button>
                    </Link>
                    <button className="text-[10px] text-white/20 hover:text-red-400/70 font-bold uppercase tracking-widest transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* VIDEO STRIP */}
          <motion.div {...fadeUp(0.35)} className="relative rounded-3xl overflow-hidden h-44 group cursor-pointer">
            <Video
              src="/concert.mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 gap-5">
              <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                style={{ background: 'rgba(212,175,55,0.2)', border: '2px solid rgba(212,175,55,0.45)' }}>
                <Play size={18} className="text-[#D4AF37] ml-1" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/60 mb-1">Platform Preview</div>
                <div className="text-base font-serif font-bold text-white">Night Club Performance Reel</div>
                <div className="text-xs text-white/35 mt-0.5">See how top artists perform on Velqora</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Sidebar */}
        <div className="lg:col-span-2 space-y-6">

          {/* Upcoming Gigs */}
          <motion.div {...fadeUp(0.2)} className="rounded-2xl p-6 space-y-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Calendar size={15} className="text-[#D4AF37]" />
              Upcoming Gigs
            </h3>
            {upcomingGigs.map((g, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: g.status === 'CONFIRMED' ? '#4ade80' : '#D4AF37' }} />
                  <div>
                    <div className="text-sm font-bold text-white">{g.title}</div>
                    <div className="text-[10px] text-white/25 font-bold uppercase tracking-widest">{g.date}</div>
                  </div>
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                  g.status === 'CONFIRMED'
                    ? 'text-green-400 border-green-400/25 bg-green-400/10'
                    : 'text-[#D4AF37] border-[#D4AF37]/25 bg-[#D4AF37]/10'
                }`}>{g.status}</span>
              </div>
            ))}
          </motion.div>

          {/* Artist Tools */}
          <motion.div {...fadeUp(0.27)} className="rounded-2xl p-6 space-y-3"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h3 className="text-base font-serif font-bold text-white mb-4">Artist Tools</h3>
            {[
              { label: 'Update Portfolio', icon: Plus, href: '/artist/profile' },
              { label: 'Manage Offers', icon: MessageSquare, href: '/artist/offers', badge: '2' },
              { label: 'View Earnings', icon: DollarSign, href: '/artist/earnings' },
            ].map((tool, i) => (
              <Link key={i} href={tool.href}>
                <div className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/5 transition-all group"
                  style={{ border: '1px solid rgba(212,175,55,0.1)' }}>
                  <div className="flex items-center gap-3">
                    <tool.icon size={16} className="text-[#D4AF37]/70" />
                    <span className="text-sm font-bold text-white/70 group-hover:text-white transition-colors uppercase tracking-widest text-[11px]">{tool.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {tool.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37]">{tool.badge}</span>
                    )}
                    <ChevronRight size={14} className="text-white/20 group-hover:text-[#D4AF37] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>

          {/* Pro Tip */}
          <motion.div {...fadeUp(0.34)} className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)' }} />
            <div className="flex items-center gap-3 mb-3">
              <Music size={15} className="text-[#D4AF37]" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Pro Tip</span>
            </div>
            <p className="text-xs font-light text-white/30 leading-relaxed">
              Artists with personalized video intro in their offers see a{' '}
              <span className="text-white font-bold">40% higher</span> booking conversion. Stand out with your story.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
