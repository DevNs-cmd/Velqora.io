'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  DollarSign,
  Music,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Activity,
  Star,
  Eye,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Clock,
  ChevronRight,
  BarChart3,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Video } from '@/components/ui/Video'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' as const },
})

// ─── DATA ────────────────────────────────────────────────────
const platformStats = [
  { label: 'Platform Revenue', value: '$142,500', trend: '+12.5%', isUp: true, icon: DollarSign },
  { label: 'Active Users', value: '4,850', trend: '+5.2%', isUp: true, icon: Users },
  { label: 'Open Requests', value: '124', trend: '-2.1%', isUp: false, icon: Calendar },
  { label: 'Total Bookings', value: '1,280', trend: '+18.4%', isUp: true, icon: Music },
]

const revenueData = [40, 25, 60, 45, 80, 55, 90, 70, 40, 85, 30, 95]

const pendingApprovals = [
  { name: 'The Golden Quartet', genre: 'Jazz', status: 'PENDING', date: '2h ago', rating: null },
  { name: 'Elite Sounds DJ', genre: 'Electronic', status: 'APPROVED', date: '5h ago', rating: 4.8 },
  { name: 'Velvet Voices', genre: 'Classical', status: 'PENDING', date: '1d ago', rating: null },
  { name: 'The Midnight Echoes', genre: 'Indie', status: 'PENDING', date: '3h ago', rating: null },
]

// ─── CLIENTS data (admin can see)
const recentClients = [
  { name: 'Sophie Laurent', tier: 'Platinum', events: 3, spent: '$8,200', lastActive: '2h ago' },
  { name: 'James Whitmore', tier: 'Gold', events: 1, spent: '$3,400', lastActive: '5h ago' },
  { name: 'Aria Patel', tier: 'Platinum', events: 5, spent: '$22,100', lastActive: '1d ago' },
]

// ─── ARTISTS data (admin can see)
const recentArtists = [
  { name: 'DJ Aurélien', genre: 'Electronic', bookings: 14, revenue: '$18,500', rating: 4.97, status: 'APPROVED' },
  { name: 'The Silk Strings', genre: 'Jazz', bookings: 8, revenue: '$9,200', rating: 4.88, status: 'APPROVED' },
  { name: 'Zara Nox', genre: 'R&B / Soul', bookings: 0, revenue: '$0', rating: null, status: 'PENDING' },
]

const systemAlerts = [
  { text: 'Payment dispute #DIS-882 requires immediate attention', level: 'red', time: '1h ago' },
  { text: '"The Midnight Echoes" — new high-priority application', level: 'gold', time: '3h ago' },
  { text: 'AI matching completed for 12 open events', level: 'blue', time: '4h ago' },
]

// ─────────────────────────────────────────────────────────────

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'clients' | 'artists'>('overview')

  return (
    <div className="space-y-10">

      {/* ── PAGE HEADER ─────────────────────────────────────── */}
      <motion.div {...fadeUp(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)' }}>
              <Shield size={15} style={{ color: '#a78bfa' }} />
            </div>
            <h1 className="text-3xl font-serif font-bold text-white">
              System <span className="italic" style={{ color: '#a78bfa' }}>Intelligence</span>
            </h1>
          </div>
          <p className="text-white/30 text-sm font-light pl-11">
            Global platform performance, user management, and administrative oversight.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline"
            className="border-white/10 text-white/50 hover:text-white hover:bg-white/5 text-xs font-bold uppercase tracking-widest h-10">
            Generate Report
          </Button>
          <Button className="h-10 px-6 text-xs font-bold uppercase tracking-widest"
            style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)', color: '#fff', boxShadow: '0 0 20px rgba(139,92,246,0.3)' }}>
            Manual Override
          </Button>
        </div>
      </motion.div>

      {/* ── HERO VIDEO BANNER ───────────────────────────────── */}
      <motion.div {...fadeUp(0.05)} className="relative rounded-3xl overflow-hidden h-44">
        <Video
          src="/ballroom.mp4"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'hue-rotate(270deg) saturate(0.5) brightness(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 flex items-center px-10 justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[.4em] mb-2" style={{ color: '#a78bfa' }}>● Live Dashboard</div>
            <div className="text-2xl font-serif font-bold text-white">Velqora Control Center</div>
            <div className="text-sm text-white/35 mt-1">Real-time sync active across 3 portals</div>
          </div>
          {/* Mini live stats */}
          <div className="hidden md:flex gap-6">
            {[
              { label: 'Online Now', value: '248' },
              { label: 'Active Events', value: '36' },
              { label: 'Pending', value: '12' },
            ].map((s, i) => (
              <div key={i} className="text-center"
                style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : undefined, paddingLeft: i > 0 ? '24px' : undefined }}>
                <div className="text-2xl font-serif font-bold text-white">{s.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-white/30">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── PLATFORM STATS ──────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {platformStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            {...fadeUp(0.08 + idx * 0.06)}
            className="p-6 rounded-2xl group relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
                <stat.icon size={18} style={{ color: '#a78bfa' }} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <div className="text-2xl font-serif font-bold text-white mb-1">{stat.value}</div>
            <div className="text-[9px] font-bold uppercase tracking-widest text-white/25">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* ── TABS: Overview / Clients / Artists ──────────────── */}
      <motion.div {...fadeUp(0.2)}>
        <div className="flex items-center gap-1 p-1 rounded-2xl w-fit mb-8"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
          {([
            { key: 'overview', label: 'Overview', icon: BarChart3 },
            { key: 'clients', label: 'Client Portal', icon: Sparkles },
            { key: 'artists', label: 'Artist Portal', icon: Music },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                activeTab === tab.key
                  ? 'text-white'
                  : 'text-white/30 hover:text-white/60'
              }`}
              style={activeTab === tab.key ? {
                background: tab.key === 'clients'
                  ? 'rgba(59,130,246,0.25)'
                  : tab.key === 'artists'
                    ? 'rgba(212,175,55,0.2)'
                    : 'rgba(139,92,246,0.25)',
                border: tab.key === 'clients'
                  ? '1px solid rgba(59,130,246,0.35)'
                  : tab.key === 'artists'
                    ? '1px solid rgba(212,175,55,0.3)'
                    : '1px solid rgba(139,92,246,0.35)',
              } : {}}
            >
              <tab.icon size={13} style={activeTab === tab.key ? {
                color: tab.key === 'clients' ? '#60a5fa' : tab.key === 'artists' ? '#D4AF37' : '#a78bfa'
              } : {}} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ──── */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Revenue Chart */}
            <div className="lg:col-span-3 rounded-2xl p-7 space-y-6"
              style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Revenue Velocity</h3>
                  <p className="text-[10px] text-white/25 font-bold uppercase tracking-widest mt-1">Gross platform revenue — 30 days</p>
                </div>
                <div className="flex items-center gap-5 text-[9px] font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2 text-white/30">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#a78bfa' }} />
                    Gross
                  </div>
                  <div className="flex items-center gap-2 text-white/20">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    Net
                  </div>
                </div>
              </div>
              {/* Bar chart */}
              <div className="h-56 flex items-end gap-1.5">
                {revenueData.map((h, i) => (
                  <div key={i} className="flex-1 group relative flex flex-col justify-end h-full">
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      style={{ background: 'rgba(139,92,246,0.25)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.3)' }}>
                      ${h}k
                    </div>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: i * 0.04, duration: 0.8, ease: 'easeOut' as const }}
                      className="rounded-t-lg transition-all group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(to top, rgba(109,40,217,0.4), rgba(139,92,246,0.6))',
                        borderTop: '1px solid rgba(139,92,246,0.5)',
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-white/15 border-t border-white/5 pt-3">
                <span>Mar 01</span><span>Mar 15</span><span>Mar 31</span>
              </div>
            </div>

            {/* Right: Approvals + Alerts */}
            <div className="lg:col-span-2 space-y-6">
              {/* Approval Queue */}
              <div className="rounded-2xl p-6 space-y-4"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                  <CheckCircle2 size={15} style={{ color: '#a78bfa' }} />
                  Approval Queue
                </h3>
                {pendingApprovals.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-all group">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.15)' }}>
                        <Star size={13} style={{ color: '#a78bfa' }} />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white leading-tight">{item.name}</div>
                        <div className="text-[9px] text-white/25 font-bold uppercase tracking-widest">{item.genre} · {item.date}</div>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${
                      item.status === 'PENDING'
                        ? 'bg-amber-400/10 text-amber-400 border-amber-400/25'
                        : 'bg-green-400/10 text-green-400 border-green-400/25'
                    }`}>{item.status}</span>
                  </div>
                ))}
                <Button variant="ghost"
                  className="w-full text-[#a78bfa] text-[10px] font-bold uppercase tracking-widest hover:bg-[#a78bfa]/5 h-10 flex items-center justify-center gap-2"
                  style={{ border: '1px solid rgba(139,92,246,0.15)' }}>
                  View All Approvals <ArrowUpRight size={12} />
                </Button>
              </div>

              {/* System Alerts */}
              <div className="rounded-2xl p-6 space-y-4"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
                  <Activity size={15} style={{ color: '#a78bfa' }} />
                  System Alerts
                </h3>
                {systemAlerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/3 transition-all">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                      alert.level === 'red' ? 'bg-red-400' : alert.level === 'gold' ? 'bg-[#D4AF37]' : 'bg-blue-400'
                    }`} />
                    <div className="flex-1">
                      <p className="text-xs text-white/40 leading-relaxed font-light">{alert.text}</p>
                      <div className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
                        <Clock size={9} />{alert.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CLIENTS TAB (admin only) ──── */}
        {activeTab === 'clients' && (
          <motion.div {...fadeUp(0)} className="space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <Eye size={15} className="text-blue-400" />
              <p className="text-xs text-blue-300/70 font-bold uppercase tracking-widest">
                Admin View — Client Portal Data. Clients cannot see each other's information.
              </p>
            </div>

            {/* Client stats row */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Clients', value: '3,240', trend: '+8%' },
                { label: 'Platinum Tier', value: '420', trend: '+12%' },
                { label: 'Avg. Spend', value: '$4,200', trend: '+5%' },
              ].map((s, i) => (
                <div key={i} className="p-5 rounded-2xl"
                  style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.12)' }}>
                  <div className="text-xl font-serif font-bold text-white">{s.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mt-1">{s.label}</div>
                  <div className="text-[10px] text-green-400 font-bold mt-2">{s.trend}</div>
                </div>
              ))}
            </div>

            {/* Client list */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(59,130,246,0.12)' }}>
              <div className="px-6 py-4 flex items-center gap-3"
                style={{ background: 'rgba(59,130,246,0.08)', borderBottom: '1px solid rgba(59,130,246,0.12)' }}>
                <Sparkles size={14} className="text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Clients</h3>
              </div>
              <div className="divide-y divide-white/5">
                {recentClients.map((client, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/3 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#60a5fa' }}>
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{client.name}</div>
                        <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-white/30 mt-0.5">
                          <span className="text-blue-400/70">{client.tier}</span>
                          <span>{client.events} events</span>
                          <span className="flex items-center gap-1"><Clock size={8} />{client.lastActive}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">{client.spent}</div>
                        <div className="text-[9px] text-white/25 font-bold uppercase tracking-widest">Total Spent</div>
                      </div>
                      <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white/20 hover:text-blue-400 hover:bg-blue-400/5 transition-all"
                        style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── ARTISTS TAB (admin only) ──── */}
        {activeTab === 'artists' && (
          <motion.div {...fadeUp(0)} className="space-y-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl"
              style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)' }}>
              <ShieldCheck size={15} className="text-[#D4AF37]" />
              <p className="text-xs text-[#D4AF37]/70 font-bold uppercase tracking-widest">
                Admin View — Artist Portal Data. Artists cannot see each other's data.
              </p>
            </div>

            {/* Artist stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Total Artists', value: '1,610', trend: '+14%' },
                { label: 'Verified', value: '1,204', trend: '+9%' },
                { label: 'Avg. Rating', value: '4.91 ★', trend: '+0.04' },
              ].map((s, i) => (
                <div key={i} className="p-5 rounded-2xl"
                  style={{ background: 'rgba(212,175,55,0.04)', border: '1px solid rgba(212,175,55,0.1)' }}>
                  <div className="text-xl font-serif font-bold text-white">{s.value}</div>
                  <div className="text-[9px] font-bold uppercase tracking-widest text-white/30 mt-1">{s.label}</div>
                  <div className="text-[10px] text-green-400 font-bold mt-2">{s.trend}</div>
                </div>
              ))}
            </div>

            {/* Artist list */}
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(212,175,55,0.12)' }}>
              <div className="px-6 py-4 flex items-center gap-3"
                style={{ background: 'rgba(212,175,55,0.06)', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                <Music size={14} className="text-[#D4AF37]" />
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Artists</h3>
              </div>
              <div className="divide-y divide-white/5">
                {recentArtists.map((artist, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-white/3 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37' }}>
                        {artist.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{artist.name}</div>
                        <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-white/30 mt-0.5">
                          <span className="text-[#D4AF37]/60">{artist.genre}</span>
                          <span>{artist.bookings} bookings</span>
                          {artist.rating && <span className="text-[#D4AF37]">★ {artist.rating}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-bold text-white">{artist.revenue}</div>
                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${
                          artist.status === 'APPROVED'
                            ? 'text-green-400 border-green-400/25 bg-green-400/10'
                            : 'text-amber-400 border-amber-400/25 bg-amber-400/10'
                        }`}>{artist.status}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {artist.status === 'PENDING' && (
                          <button className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all hover:opacity-80"
                            style={{ background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
                            Approve
                          </button>
                        )}
                        <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white/20 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all"
                          style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Second video strip in artists tab */}
            <div className="relative rounded-2xl overflow-hidden h-36">
              <Video
                src="/concert.mp4"
                className="absolute inset-0 w-full h-full object-cover opacity-30"
                style={{ filter: 'hue-rotate(30deg) saturate(0.7)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 to-transparent" />
              <div className="absolute inset-0 flex items-center px-8 justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]/60 mb-1">Platform Activity</div>
                  <div className="text-lg font-serif font-bold text-white">36 Live Events This Weekend</div>
                </div>
                <Button className="text-[10px] font-bold uppercase tracking-widest h-10 px-5"
                  style={{ background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.35)', color: '#D4AF37' }}>
                  View All
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
