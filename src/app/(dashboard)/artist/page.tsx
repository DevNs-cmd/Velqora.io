'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  Star, 
  ArrowRight, 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  MessageSquare,
  Search,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function ArtistDashboardPage() {
  const { data: session } = useSession()

  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: DollarSign, color: 'text-gold' },
    { label: 'Upcoming Shows', value: '4', icon: Calendar, color: 'text-white' },
    { label: 'Profile Views', value: '1,240', icon: TrendingUp, color: 'text-gold-light' },
    { label: 'Average Rating', value: '4.98', icon: Star, color: 'text-gold' },
  ]

  const newRequests = [
    {
      id: 'REQ-45',
      client: 'Mansion Party - Beverly Hills',
      date: 'Oct 12, 2026',
      budget: '$2,500 - $4,000',
      description: 'Soulful Jazz trio needed for luxury garden party.'
    },
    {
      id: 'REQ-48',
      client: 'Tech Summit Afterparty',
      date: 'Nov 05, 2026',
      budget: '$5,000+',
      description: 'High-energy DJ with live percussionist for closing night.'
    }
  ]

  return (
    <div className="space-y-12">
       {/* ARTIST DASHBOARD HERO */}
       <section className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-charcoal-light to-charcoal border border-gold/10 overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 blur-[100px] pointer-events-none group-hover:opacity-40 transition-opacity" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <div className="space-y-2">
                   <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Showtime, <span className="text-gold italic">{session?.user?.name?.split(' ')[0]}</span>.</h1>
                   <p className="text-white/40 text-lg font-light leading-relaxed">Your stage is ready. Explore new requests and manage your upcoming world-class performances.</p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                   <Link href="/artist/feed">
                      <Button className="h-14 px-8 bg-gold text-charcoal font-bold group shadow-2xl transition-all">
                         <Search className="mr-2 h-5 w-5" />
                         Find New Gigs
                      </Button>
                   </Link>
                </div>
             </div>
             
             {/* QUICK STATS */}
             <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, idx) => (
                   <motion.div
                     key={stat.label}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: idx * 0.1 }}
                     className="p-6 rounded-3xl bg-white/5 border border-white/10 hover:border-gold/20 transition-all group/stat"
                   >
                      <stat.icon className={`${stat.color} mb-4 group-hover/stat:scale-110 transition-transform`} size={24} />
                      <div className="text-2xl font-serif font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">{stat.label}</div>
                   </motion.div>
                ))}
             </div>
          </div>
       </section>

       {/* FEED & EARNINGS */}
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Incoming Feed */}
          <div className="lg:col-span-3 space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold text-white">Recommended Requests</h3>
                <Link href="/artist/feed" className="text-gold text-xs font-bold uppercase tracking-widest flex items-center hover:underline group">
                   See all <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {newRequests.map((req) => (
                   <Card key={req.id} className="bg-charcoal border-white/5 hover:border-gold/20 transition-all overflow-hidden group">
                      <CardContent className="p-8">
                         <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                               <div className="flex items-center justify-between">
                                  <div className="text-[10px] font-bold uppercase tracking-tighter text-white/40">{req.id}</div>
                                  <div className="text-gold font-bold text-sm tracking-widest">{req.budget}</div>
                               </div>
                               <h4 className="text-xl font-bold text-white mb-2">{req.client}</h4>
                               <p className="text-sm font-light text-white/50 leading-relaxed line-clamp-2">{req.description}</p>
                               <div className="flex items-center space-x-6 text-xs text-white/30 font-bold uppercase tracking-widest pt-2">
                                  <div className="flex items-center space-x-2"><Calendar size={14} className="text-gold" /> <span>{req.date}</span></div>
                                  <div className="flex items-center space-x-2"><Users size={14} className="text-gold" /> <span>250 Guests</span></div>
                               </div>
                            </div>
                            <div className="flex flex-col justify-between items-end border-l border-white/5 pl-6 min-w-[140px]">
                               <Link href={`/artist/feed/${req.id}`} className="w-full">
                                  <Button className="w-full bg-white/10 text-white hover:bg-gold hover:text-charcoal transition-all">
                                     Send Offer
                                  </Button>
                               </Link>
                               <button className="text-[10px] text-white/20 hover:text-red-400 font-bold uppercase tracking-widest transition-colors mt-4">Ignore</button>
                            </div>
                         </div>
                      </CardContent>
                   </Card>
                ))}
             </div>
          </div>

          {/* Performance Tools Sidebar */}
          <div className="lg:col-span-2 space-y-12">
             <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-white">Artist Tools</h3>
                <div className="grid grid-cols-1 gap-4">
                   <Link href="/artist/profile">
                      <Button variant="outline" className="w-full h-16 justify-between border-gold/10 text-white hover:border-gold hover:bg-gold/5 group">
                         <div className="flex items-center space-x-4">
                            <Plus size={18} className="text-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest">Update Portfolio</span>
                         </div>
                         <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Button>
                   </Link>
                   <Link href="/artist/offers">
                      <Button variant="outline" className="w-full h-16 justify-between border-gold/10 text-white hover:border-gold hover:bg-gold/5 group">
                         <div className="flex items-center space-x-4">
                            <MessageSquare size={18} className="text-gold" />
                            <span className="text-xs font-bold uppercase tracking-widest">Manage Offers</span>
                         </div>
                         <div className="bg-gold text-charcoal w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">2</div>
                      </Button>
                   </Link>
                </div>
             </div>

             <Card className="bg-charcoal border-white/5 p-8 relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                   <div className="flex items-center space-x-4 mb-2">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">< TrendingUp size={20} /></div>
                      <div>
                         <h4 className="text-lg font-bold text-white">Pro Tip</h4>
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gold/60">Algorithm Insight</span>
                      </div>
                   </div>
                   <p className="text-sm font-light text-white/40 leading-relaxed">
                      Artists who include personalized video introductions in their offers see a <span className="text-white font-bold">40% increase</span> in booking conversion. Elite clients value the personal connection.
                   </p>
                </div>
             </Card>
          </div>
       </div>
    </div>
  )
}
