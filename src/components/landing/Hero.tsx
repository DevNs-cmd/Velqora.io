'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Music, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const Brand3D = dynamic(() => import('@/components/ui/Brand3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-charcoal/50 animate-pulse rounded-3xl border border-gold/10" />
})

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 overflow-hidden">
      {/* Background with Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gold/10 blur-[150px] rounded-full opacity-30" />
        <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full opacity-20" />
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-gold/15 blur-[100px] rounded-full opacity-25" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8 max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center space-x-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full w-fit"
          >
            <Star size={14} className="text-gold fill-gold" />
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[.2em] text-gold-light">
              World-Class Live Entertainment
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] text-white">
              The <span className="text-gold text-glow-gold italic">Art</span> of Performance.
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg font-light">
              Experience the exclusivity. Book elite singers, high-profile bands, and internationally acclaimed DJs for your most prestigious events.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <Link href="/auth/signin">
              <Button className="h-14 px-10 text-lg bg-gradient-gold text-charcoal font-bold group">
                Book a Performer
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            
            <button className="flex items-center space-x-4 text-white hover:text-gold transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full border border-gold/50 flex items-center justify-center group-hover:bg-gold/10 group-hover:scale-110 transition-all">
                <Play size={20} className="fill-gold text-gold" />
              </div>
              <span className="font-semibold tracking-wide uppercase text-sm">Experience the Film</span>
            </button>
          </div>

          {/* TRUST BADGE */}
          <div className="pt-8 flex flex-wrap gap-8 items-center border-t border-white/10 opacity-60">
            <div className="flex items-center space-x-2">
              <Award size={18} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Premium Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star size={18} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">4.9/5 Avg. Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <Music size={18} className="text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-widest">500+ Curated Artists</span>
            </div>
          </div>
        </motion.div>

        {/* 3D LOGO / MASHUP */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
           animate={{ opacity: 1, scale: 1, rotateY: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="hidden lg:block relative"
        >
          {/* Animated 3D elements could go here */}
          <div className="relative z-10">
            <Brand3D />
          </div>
          
          {/* Floating Luxury Elements (Mock) */}
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-10 -right-10 w-32 h-32 bg-gold/5 backdrop-blur-xl border border-gold/20 rounded-2xl flex items-center justify-center p-4 shadow-2xl"
          >
             <Music className="text-gold w-12 h-12 opacity-50" />
          </motion.div>
          
          <motion.div
            animate={{ 
              y: [0, 20, 0],
              rotate: [0, -5, 0]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-10 left-0 w-40 h-16 bg-charcoal-light/50 backdrop-blur-md border border-gold/10 rounded-full flex items-center justify-center px-6 shadow-2xl space-x-3"
          >
             <div className="flex -space-x-2">
                {[1,2,3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gold border border-charcoal" />
                ))}
             </div>
             <span className="text-[10px] text-white/70 font-semibold tracking-tighter">Elite Roster</span>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-30"
      >
        <span className="text-[10px] text-gold font-bold uppercase tracking-[.3em]">Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </motion.div>
    </section>
  )
}
