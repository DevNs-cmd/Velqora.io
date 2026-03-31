'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Star, Music, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Video } from '@/components/ui/Video'

const Brand3D = dynamic(() => import('@/components/ui/Brand3D'), { 
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-charcoal/50 animate-pulse rounded-3xl border border-gold/10" />
})

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[#020202]">
        <Video
          src="/concert.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-110"
        />
        
        {/* iOS style deep cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/80" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center pt-24 pb-12">
        {/* TEXT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} 
          className="flex flex-col space-y-10"
        >
          {/* iOS Premium Glass Box */}
          <div className="p-10 md:p-14 bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[4rem] space-y-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30" />
             
             <div className="relative z-10 space-y-8">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-28 h-28 md:w-36 md:h-36 relative mb-4 rounded-full border-2 border-white/obj-10 overflow-hidden bg-black/60 shadow-2xl transition-transform duration-1000 ease-out flex items-center justify-center"
                >
                   <Image 
                    src="/logo.jpg" 
                    alt="Velqora Premium Logo" 
                    fill
                    className="object-contain p-6"
                   />
                </motion.div>
                
                <div className="space-y-4">
                  <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.95] text-white tracking-tight">
                    Velqora <span className="text-gold italic block mt-2 text-5xl md:text-7xl">Private.</span>
                  </h1>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed max-w-sm font-medium tracking-[0.3em] uppercase border-l-2 border-gold/30 pl-8 mt-6">
                    Curated Excellence. <br/> Exclusive live talent for global events.
                  </p>
                </div>
             </div>

             <div className="relative z-10 flex flex-wrap gap-6 pt-6">
               <Link href="/auth/signin">
                 <Button className="h-16 px-14 text-[11px] uppercase tracking-[0.3em] bg-white text-black hover:bg-gold hover:text-black transition-all font-bold rounded-2xl shadow-2xl">
                   Enter Portal
                 </Button>
               </Link>
               
               <button className="flex items-center space-x-5 text-white/40 hover:text-white transition-all group">
                 <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-all backdrop-blur-xl">
                   <Play size={18} className="fill-white text-white translate-x-0.5" />
                 </div>
                 <span className="text-[10px] font-bold uppercase tracking-[0.4em]">The Film</span>
               </button>
             </div>
          </div>
        </motion.div>

        {/* AMBIENT ELEMENT */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95, x: 20 }}
           animate={{ opacity: 1, scale: 1, x: 0 }}
           transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
           className="hidden lg:block h-full"
        >
           <div className="relative group h-full flex items-center justify-center">
              <div className="relative z-10 w-full aspect-[4/5] rounded-[5rem] overflow-hidden border border-white/10 shadow-[0_48px_80px_-24px_rgba(0,0,0,0.6)]">
                 <Video
                   src="/ballroom.mp4"
                   autoPlay
                   loop
                   muted
                   playsInline
                   className="w-full h-full object-cover saturate-[0.8] brightness-[0.8] group-hover:saturate-[1.1] group-hover:brightness-100 transition-all duration-1000 ease-in-out"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                 
                 <div className="absolute bottom-12 left-12 right-12">
                    <div className="p-8 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] flex items-center justify-between shadow-2xl">
                       <div className="space-y-1">
                          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold/80">Live View</div>
                          <div className="text-2xl font-serif font-bold text-white tracking-tight italic">Luxury Formal.</div>
                       </div>
                       <motion.div 
                         whileHover={{ rotate: 180 }}
                         className="w-14 h-14 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center text-gold backdrop-blur-xl"
                       >
                          <Star size={20} />
                       </motion.div>
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
