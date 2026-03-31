'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Music,
  Calendar,
  Star,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Plus,
  Play,
  TrendingUp,
  Clock,
  ChevronRight,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: 'easeOut' as const },
})

export default function ClientDashboardPage() {
  const { data: session } = useSession()
  const firstName = session?.user?.name?.split(' ')[0] ?? 'there'

  const stats = [
    { label: 'Active Requests', value: '3', icon: Music, accent: '#D4AF37' },
    { label: 'Upcoming Events', value: '1', icon: Calendar, accent: '#fff' },
    { label: 'Total Spent', value: '$4.2k', icon: TrendingUp, accent: '#D4AF37' },
    { label: 'Events Done', value: '12', icon: CheckCircle2, accent: '#4ade80' },
  ]

  const activeRequests = [
    {
      id: 'REQ-01',
      title: 'Summer Gala Performance',
      date: 'Aug 15, 2026',
      status: 'MATCHING',
      offers: 5,
      budget: '$2,000 – $3,500',
      type: 'Jazz / Orchestral',
    },
    {
      id: 'REQ-02',
      title: 'Private Rooftop Soirée',
      date: 'Sept 02, 2026',
      status: 'OFFER_ACCEPTED',
      offers: 2,
      budget: '$1,200 – $1,800',
      type: 'Acoustic / Pop',
    },
  ]

  const timeline = [
    { label: 'Request submitted', time: '2h ago', done: true },
    { label: 'AI matching in progress', time: '1h ago', done: true },
    { label: 'Offers received (5)', time: '45m ago', done: true },
    { label: 'Awaiting your review', time: 'Now', done: false },
  ]

  return (
    <div className="space-y-10">

      {/* ── HERO BANNER ────────────────────────────────────── */}
      <motion.section {...fadeUp(0)} className="relative rounded-3xl overflow-hidden min-h-[280px] flex items-end">
        {/* video bg */}
        <video
          src="/concert.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* gold corner accent */}
        <div className="absolute top-6 right-6 w-32 h-32 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 70%)' }} />

        <div className="relative z-10 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-lg">
            {/* Badge */}
            <div className="flex items-center gap-2 w-fit px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}>
              <Sparkles size={12} className="text-[#D4AF37]" />
              <span className="text-[10px] font-bold tracking-[.3em] text-[#D4AF37] uppercase">Platinum Concierge</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Bonjour,{' '}
              <span className="italic" style={{ color: '#D4AF37' }}>{firstName}</span>
            </h1>
            <p className="text-white/50 text-base font-light leading-relaxed">
              Your next cinematic experience is just a request away. Curated performers, unmatched luxury.
            </p>

            <Link href="/client/requests/new">
              <Button className="mt-2 h-12 px-8 font-bold text-sm tracking-widest uppercase"
                style={{ background: 'linear-gradient(135deg,#D4AF37,#b8960c)', color: '#0a0a0a' }}>
                <Plus size={16} className="mr-2" />
                Create Request
              </Button>
            </Link>
          </div>

          {/* MINI STATS GRID */}
          <div className="grid grid-cols-2 gap-3 flex-shrink-0">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                {...fadeUp(0.1 + i * 0.08)}
                className="p-4 rounded-2xl flex flex-col gap-2 min-w-[110px]"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <s.icon size={18} style={{ color: s.accent }} />
                <div className="text-2xl font-bold text-white font-serif">{s.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-[.15em] text-white/30">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── MAIN GRID ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* LEFT: Requests */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-white">Active Requests</h2>
            <Link href="/client/requests"
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#D4AF37]/70 transition-colors group">
              View all <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {activeRequests.map((req, i) => (
              <motion.div
                key={req.id}
                {...fadeUp(0.15 + i * 0.1)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* hover gold border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(212,175,55,0.3)' }} />

                {/* status strip */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${req.status === 'MATCHING' ? 'bg-blue-400' : 'bg-[#D4AF37]'}`} />

                <div className="p-6 pl-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
                        <Music size={16} className="text-[#D4AF37]" />
                      </div>
                      <div>
                        <div className="text-[9px] font-bold uppercase tracking-widest text-white/25">{req.id} · {req.type}</div>
                        <h3 className="text-base font-bold text-white">{req.title}</h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-wider text-white/35 pl-12">
                      <span className="flex items-center gap-1.5"><Calendar size={11} className="text-[#D4AF37]" />{req.date}</span>
                      <span className="flex items-center gap-1.5"><Star size={11} className="text-[#D4AF37]" />{req.budget}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-shrink-0">
                    <div className="text-right">
                      <div className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border mb-1 ${
                        req.status === 'MATCHING'
                          ? 'bg-blue-400/10 text-blue-400 border-blue-400/25'
                          : 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/25'
                      }`}>
                        {req.status.replace('_', ' ')}
                      </div>
                      <div className="text-[10px] text-white/30 font-bold">{req.offers} offers</div>
                    </div>
                    <Link href={`/client/requests/${req.id}`}>
                      <button className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{ background: 'rgba(212,175,55,0.12)', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37' }}>
                        <ChevronRight size={16} />
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* VIDEO SHOWCASE: Ballroom */}
          <motion.div {...fadeUp(0.35)} className="relative rounded-3xl overflow-hidden h-48 group cursor-pointer">
            <video
              src="/ballroom.mp4"
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 gap-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: 'rgba(212,175,55,0.2)', border: '2px solid rgba(212,175,55,0.5)' }}>
                <Play size={20} className="text-[#D4AF37] ml-1" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/70 mb-1">Exclusive Preview</div>
                <div className="text-lg font-serif font-bold text-white">Grand Ballroom Experience</div>
                <div className="text-xs text-white/40 mt-0.5">See what elite events look like</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Sidebar panels */}
        <div className="lg:col-span-2 space-y-6">

          {/* Event Timeline */}
          <motion.div {...fadeUp(0.2)} className="rounded-2xl p-6 space-y-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Clock size={16} className="text-[#D4AF37]" />
              Request Timeline
            </h3>
            <div className="space-y-4">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${step.done ? 'border-[#D4AF37] bg-[#D4AF37]/20' : 'border-white/20 bg-transparent'}`}>
                    {step.done && <CheckCircle2 size={10} className="text-[#D4AF37]" />}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${step.done ? 'text-white' : 'text-white/40'}`}>{step.label}</div>
                    <div className="text-[10px] text-white/25 font-bold uppercase tracking-widest">{step.time}</div>
                  </div>
                  {!step.done && (
                    <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse flex-shrink-0 mt-2" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Artist Spotlight */}
          <motion.div {...fadeUp(0.28)} className="rounded-2xl overflow-hidden group"
            style={{ border: '1px solid rgba(212,175,55,0.15)' }}>
            <div className="relative h-36 overflow-hidden">
              <video
                src="/concert.mp4"
                autoPlay muted loop playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-700"
                style={{ filter: 'grayscale(30%)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
              <div className="absolute bottom-4 left-4">
                <div className="text-[9px] font-bold tracking-widest text-[#D4AF37] uppercase mb-1">Chef's Choice</div>
                <div className="text-base font-serif font-bold text-white">The Velvet Symphony</div>
              </div>
            </div>
            <div className="p-5" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-xs text-white/40 leading-relaxed mb-4">
                An 8-piece orchestral funk fusion band. Currently accepting Autumn 2026 bookings. Highly rated by 48 Velqora clients.
              </p>
              <Button variant="ghost"
                className="w-full h-10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest hover:bg-[#D4AF37]/5"
                style={{ border: '1px solid rgba(212,175,55,0.2)' }}>
                Request Pre-Approval
              </Button>
            </div>
          </motion.div>

          {/* Concierge Tip */}
          <motion.div {...fadeUp(0.35)} className="rounded-2xl p-5"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="flex items-center gap-3 mb-3">
              <AlertCircle size={16} className="text-[#D4AF37]" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Concierge Tip</span>
            </div>
            <p className="text-xs font-light text-white/35 leading-relaxed italic">
              "Provide high-quality venue photos in your request. Top-tier artists prioritize events that showcase an elite environment."
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
