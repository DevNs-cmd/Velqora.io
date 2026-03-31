'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Music, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const Brand3D = dynamic(() => import('@/components/ui/Brand3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-charcoal/50 animate-pulse rounded-3xl border border-gold/10" />
})

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-105"
        >
          <source src="/hero-1.mp4" type="video/mp4" />
        </video>
        
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/40 to-charcoal/90" />
        <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center pt-20">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col space-y-10"
        >
          {/* Glassmorphic Brand Box */}
          <div className="p-8 md:p-12 bg-black/30 backdrop-blur-2xl border border-gold/10 rounded-[3rem] space-y-8 shadow-2xl relative group">
             <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/5 blur-3xl group-hover:bg-gold/20 transition-all" />
             
             <div className="space-y-6">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="w-24 h-24 md:w-32 md:h-32 relative mb-6 rounded-full border border-gold/30 overflow-hidden bg-black shadow-[0_0_30px_rgba(212,175,55,0.15)] group-hover:scale-105 transition-transform duration-700"
                >
                   <Image 
                    src="/logo.jpg" 
                    alt="Velqora Premium Logo" 
                    fill
                    className="object-contain p-2"
                   />
                </motion.div>
                
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] text-white tracking-tight">
                    Velqora <span className="text-gold italic block mt-1">Private.</span>
                  </h1>
                  <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-sm font-light tracking-[.25em] uppercase italic border-l border-gold/20 pl-6">
                    The standard of excellence. Elite talent for exclusive curated events.
                  </p>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-6 pt-4">
               <Link href="/auth/signin">
                 <Button className="h-16 px-12 text-sm uppercase tracking-[0.2em] bg-white text-charcoal hover:bg-gold transition-all font-bold shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                   Book Talent
                 </Button>
               </Link>
               
               <button className="flex items-center space-x-4 text-white/60 hover:text-gold transition-all group">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-all">
                   <Play size={16} className="fill-gold text-gold" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-widest">Experience Film</span>
               </button>
             </div>
          </div>
        </motion.div>

        {/* SECOND VIDEO / AMBIENT ELEMENT */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.2 }}
           className="hidden lg:block"
        >
          <div className="relative group">
             <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
             <div className="relative z-10 w-full aspect-[4/5] rounded-[4rem] overflow-hidden border border-gold/10 shadow-2xl">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                >
                  <source src="/hero-2.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60" />
                
                <div className="absolute bottom-10 left-10 right-10">
                   <div className="p-6 bg-black/40 backdrop-blur-xl border border-gold/10 rounded-3xl flex items-center justify-between">
                      <div>
                         <div className="text-[10px] font-bold uppercase tracking-[.3em] text-gold mb-1">Live Vibe</div>
                         <div className="text-xl font-serif font-bold text-white">Elite Performers.</div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-charcoal">
                         <Star size={20} />
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>

      {/* FOOTER INDICATOR */}
      <div className="absolute bottom-10 left-10 flex items-center space-x-6 z-10">
         <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-white/30">
            <span className="w-8 h-px bg-white/20" />
            <span>Standard of Excellence</span>
         </div>
      </div>
    </section>
  )
}
