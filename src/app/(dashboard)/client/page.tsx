'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Music, 
  Calendar, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function ClientDashboardPage() {
  const { data: session } = useSession()

  const stats = [
    { label: 'Active Requests', value: '3', icon: Music, color: 'text-gold' },
    { label: 'Upcoming Bookings', value: '1', icon: Calendar, color: 'text-white' },
    { label: 'Total Spent', value: '$4.2k', icon: Star, color: 'text-gold-light' },
    { label: 'Completed Events', value: '12', icon: CheckCircle2, color: 'text-gold' },
  ]

  const activeRequests = [
    {
      id: 'REQ-01',
      title: 'Summer Gala Performance',
      date: 'Aug 15, 2026',
      status: 'MATCHING',
      offers: 5,
      budget: '$2,000 - $3,500'
    },
    {
      id: 'REQ-02',
      title: 'Private Rooftop Soirée',
      date: 'Sept 02, 2026',
      status: 'OFFER_ACCEPTED',
      offers: 2,
      budget: '$1,200 - $1,800'
    }
  ]

  return (
    <div className="space-y-12">
       {/* DASHBOARD HERO */}
       <section className="relative p-12 rounded-[2.5rem] bg-gradient-to-br from-charcoal-light to-charcoal border border-gold/10 overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold/5 blur-[100px] pointer-events-none group-hover:opacity-40 transition-opacity" />
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full w-fit"
                >
                   <Sparkles size={14} className="text-gold" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-gold-light">Member Tier: Platinum</span>
                </motion.div>
                <div className="space-y-2">
                   <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Bonjour, <span className="text-gold italic">{session?.user?.name?.split(' ')[0]}</span>.</h1>
                   <p className="text-white/40 text-lg font-light">Your next performance experience is just a few steps away.</p>
                </div>
                <div className="flex items-center space-x-4 pt-4">
                   <Link href="/client/requests/new">
                      <Button className="h-14 px-8 bg-gold text-charcoal font-bold group shadow-2xl">
                         <Plus className="mr-2 h-5 w-5" />
                         Create New Request
                      </Button>
                   </Link>
                </div>
             </div>
             
             {/* QUICK STATS IN HERO */}
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

       {/* ACTIVE REQUESTS & OFFERS */}
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-8">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-serif font-bold text-white">Active Requests</h3>
                <Link href="/client/requests" className="text-gold text-xs font-bold uppercase tracking-widest flex items-center hover:underline group">
                   See all <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
             </div>
             
             <div className="grid grid-cols-1 gap-6">
                {activeRequests.length > 0 ? (
                   activeRequests.map((req) => (
                      <Card key={req.id} className="bg-charcoal border-white/5 hover:border-gold/20 transition-all overflow-hidden group">
                         <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                               <div className="space-y-4">
                                  <div className="flex items-center space-x-3">
                                     <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold/20 transition-all"><Music size={20} /></div>
                                     <div>
                                        <div className="text-[10px] font-bold uppercase tracking-tighter text-white/40 mb-1">{req.id}</div>
                                        <h4 className="text-xl font-bold text-white">{req.title}</h4>
                                     </div>
                                  </div>
                                  <div className="flex flex-wrap gap-6 text-xs text-white/40 font-bold uppercase tracking-widest">
                                     <div className="flex items-center space-x-2"><Calendar size={14} className="text-gold" /> <span>{req.date}</span></div>
                                     <div className="flex items-center space-x-2"><Star size={14} className="text-gold" /> <span>{req.budget}</span></div>
                                  </div>
                               </div>

                               <div className="flex items-center space-x-6">
                                  <div className="text-right flex flex-col items-end">
                                     <div className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${
                                       req.status === 'MATCHING' ? 'bg-blue-400/10 text-blue-400 border border-blue-400/20' : 'bg-gold/10 text-gold border border-gold/20'
                                     }`}>
                                        {req.status.replace('_', ' ')}
                                     </div>
                                     <div className="text-sm font-semibold text-white/50">{req.offers} Offers Received</div>
                                  </div>
                                  <Link href={`/client/requests/${req.id}`}>
                                     <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/10 focus:ring-0">Manage</Button>
                                  </Link>
                               </div>
                            </div>
                         </CardContent>
                      </Card>
                   ))
                ) : (
                   <div className="p-20 text-center space-y-6 bg-white/5 rounded-[2rem] border border-dashed border-white/10">
                      <div className="w-16 h-16 rounded-full bg-gold/5 flex items-center justify-center text-gold mx-auto"><Music size={32} /></div>
                      <div className="space-y-2">
                         <h4 className="text-xl font-bold text-white">No active requests</h4>
                         <p className="text-white/30 font-light">Create a request to start matching with world-class performers.</p>
                      </div>
                      <Link href="/client/requests/new">
                        <Button className="bg-gold text-charcoal font-bold">New Request</Button>
                      </Link>
                   </div>
                )}
             </div>
          </div>

          {/* Right Sidebar: Recommended or Tips */}
          <div className="lg:col-span-2 space-y-8">
             <h3 className="text-2xl font-serif font-bold text-white">Exclusive Spotlight</h3>
             <Card className="bg-charcoal border-gold/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-2 h-full bg-gold/30 group-hover:bg-gold transition-colors" />
                <div className="p-8 space-y-6">
                   <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Sparkles size={16} /></div>
                      <span className="text-xs font-bold uppercase tracking-[.3em] text-white">Chef's Choice: Artists</span>
                   </div>
                   <div className="space-y-4">
                      <div className="relative aspect-video rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                         <img src="https://images.unsplash.com/photo-1501612722273-730109fa610e?auto=format&fit=crop&q=80" alt="Concert" className="object-cover w-full h-full" />
                      </div>
                      <div className="space-y-2 text-center text-white/50 text-sm font-light leading-relaxed">
                         "The Velvet Symphony" just joined Velqora. An 8-piece orchestral funk fusion band currently accepting bookings for Autumn 2026.
                      </div>
                   </div>
                   <Button variant="ghost" className="w-full text-gold hover:bg-gold/5 border border-gold/10 font-bold uppercase tracking-widest text-xs h-12">
                      Request Pre-Approval
                   </Button>
                </div>
             </Card>
             
             <Card className="bg-charcoal border-white/5 p-8">
                <div className="flex items-center space-x-4 mb-6">
                   <AlertCircle size={20} className="text-gold" />
                   <h4 className="text-lg font-bold text-white">Concierge Tip</h4>
                </div>
                <p className="text-sm font-light text-white/40 leading-relaxed italic">
                   "To get better matches, provide high-quality venue photos in your event request. Top-tier artists prioritize events that showcase their performance in an elite environment."
                </p>
             </Card>
          </div>
       </div>
    </div>
  )
}
