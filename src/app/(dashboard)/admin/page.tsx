'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  DollarSign, 
  Music, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldCheck, 
  Zap,
  TrendingUp,
  Activity,
  Star
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Platform Revenue', value: '$142,500', trend: '+12.5%', isUp: true, icon: DollarSign },
    { label: 'Active Users', value: '4,850', trend: '+5.2%', isUp: true, icon: Users },
    { label: 'Open Requests', value: '124', trend: '-2.1%', isUp: false, icon: Calendar },
    { label: 'Total Bookings', value: '1,280', trend: '+18.4%', isUp: true, icon: Music },
  ]

  const recentApprovals = [
    { name: 'The Golden Quartet', type: 'Artist', status: 'PENDING', date: '2h ago' },
    { name: 'Elite Sounds DJ', type: 'Artist', status: 'APPROVED', date: '5h ago' },
    { name: 'Velvet Voices', type: 'Artist', status: 'PENDING', date: '1d ago' },
  ]

  return (
    <div className="space-y-12">
       {/* DASHBOARD HEADER */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
             <h1 className="text-4xl font-serif font-bold text-white">System <span className="text-gold italic">Intelligence</span></h1>
             <p className="text-white/40 text-sm font-light">Global platform performance and administrative overview.</p>
          </div>
          <div className="flex items-center space-x-4">
             <Button variant="outline" className="border-gold/10 text-white/60 hover:text-gold hover:bg-gold/5">
                Generate Report
             </Button>
             <Button className="bg-gold text-charcoal font-bold shadow-2xl">
                Manual Override
             </Button>
          </div>
       </div>

       {/* GLOBAL STATS */}
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
             <motion.div
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.1 }}
               className="p-8 rounded-[2rem] bg-charcoal-dark border border-white/5 hover:border-gold/20 transition-all group"
             >
                <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold transition-all group-hover:text-charcoal"><stat.icon size={20} /></div>
                   <div className={`flex items-center space-x-1 text-[10px] font-bold uppercase tracking-widest ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                      <span>{stat.trend}</span>
                   </div>
                </div>
                <div className="text-3xl font-serif font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/20">{stat.label}</div>
             </motion.div>
          ))}
       </div>

       {/* MAIN PANELS */}
       <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Revenue Chart Placeholder */}
          <div className="lg:col-span-3 space-y-8">
             <div className="p-1 rounded-[2.5rem] bg-gradient-to-br from-gold/10 via-transparent to-transparent border border-gold/10 overflow-hidden">
                <Card className="bg-charcoal border-none rounded-[2.4rem] p-8">
                   <div className="flex items-center justify-between mb-12">
                      <div className="space-y-1">
                         <h3 className="text-2xl font-serif font-bold text-white">Revenue Velocity</h3>
                         <p className="text-white/40 text-xs font-light">Gross platform revenue vs. commission (30 Days)</p>
                      </div>
                      <div className="flex items-center space-x-6 text-[10px] font-bold uppercase tracking-widest">
                         <div className="flex items-center space-x-2 text-white/40"><div className="w-2 h-2 rounded-full bg-gold" /> <span>Gross</span></div>
                         <div className="flex items-center space-x-2 text-white/40"><div className="w-2 h-2 rounded-full bg-white/20" /> <span>Net</span></div>
                      </div>
                   </div>
                   
                   {/* Simulated Chart */}
                   <div className="h-64 flex items-end justify-between gap-2">
                      {[40, 25, 60, 45, 80, 55, 90, 70, 40, 85, 30, 95].map((h, i) => (
                         <div key={i} className="flex-1 group relative">
                            <motion.div 
                               initial={{ height: 0 }}
                               animate={{ height: `${h}%` }}
                               transition={{ delay: i * 0.05, duration: 1 }}
                               className="bg-gold/20 rounded-t-lg group-hover:bg-gold/40 transition-all border-t border-gold/40"
                            />
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gold/10 text-gold text-[8px] font-bold px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                               ${h}k
                            </div>
                         </div>
                      ))}
                   </div>
                   <div className="flex justify-between mt-6 text-[8px] font-bold uppercase tracking-tighter text-white/20 border-t border-white/5 pt-4">
                      <span>March 01</span>
                      <span>March 15</span>
                      <span>March 31</span>
                   </div>
                </Card>
             </div>
          </div>

          {/* Quick Actions & Approvals */}
          <div className="lg:col-span-2 space-y-8">
             <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-white">Approval Queue</h3>
                <div className="bg-charcoal-dark/50 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                   <div className="p-6">
                      <div className="space-y-4">
                         {recentApprovals.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-transparent hover:border-gold/10 group">
                               <div className="flex items-center space-x-4">
                                  <div className="w-10 h-10 rounded-full bg-charcoal flex items-center justify-center text-gold border border-gold/10 group-hover:bg-gold group-hover:text-charcoal transition-all">
                                     <Star size={16} />
                                  </div>
                                  <div>
                                     <div className="text-sm font-bold text-white mb-0.5">{item.name}</div>
                                     <div className="text-[10px] text-white/30 font-bold uppercase tracking-widest">{item.date}</div>
                                  </div>
                               </div>
                               <Badge className={item.status === 'PENDING' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-green-400/10 text-green-400 border-green-400/20'}>
                                  {item.status}
                               </Badge>
                            </div>
                         ))}
                      </div>
                      <Button variant="ghost" className="w-full mt-6 text-gold text-[10px] font-bold uppercase tracking-widest hover:bg-gold/5 flex items-center justify-center">
                         View All Approvals <ArrowUpRight size={14} className="ml-2" />
                      </Button>
                   </div>
                </div>
             </div>

             <div className="p-8 rounded-3xl bg-charcoal border border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-3xl" />
                <h4 className="text-lg font-bold text-white mb-6 flex items-center">
                   <Activity size={18} className="mr-3 text-gold" /> System Alerts
                </h4>
                <div className="space-y-4">
                   <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5" />
                      <p className="text-xs text-white/40 leading-relaxed font-light">
                         Payment dispute #DIS-882 requires immediate attention. (Escalated 1h ago)
                      </p>
                   </div>
                   <div className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold mt-1.5" />
                      <p className="text-xs text-white/40 leading-relaxed font-light">
                         New artist application from "The Midnight Echoes" threshold: High Matching.
                      </p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  )
}
