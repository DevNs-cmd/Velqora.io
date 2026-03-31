'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Music, Heart, Star } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section className="py-32 relative overflow-hidden bg-charcoal-dark border-t border-gold/10" ref={ref}>
       {/* Ambient Backlight */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gold/5 blur-[200px] pointer-events-none" />
       
       <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-12">
             <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  className="text-gold font-bold uppercase tracking-[.5em] text-xs"
                >
                  Join the Excellence
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-8xl font-serif font-bold text-white leading-tight"
                >
                  Ready to be <span className="italic text-glow-gold">Extraordinary?</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                  className="text-white/40 text-lg md:text-2xl font-light"
                >
                  Whether you’re looking to hire the best or perform for them, Velqora is your stage.
                </motion.p>
             </div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={isInView ? { opacity: 1, scale: 1 } : {}}
               transition={{ delay: 0.3 }}
               className="flex flex-col sm:flex-row gap-8 justify-center items-center"
             >
                <Link href="/auth/signin">
                  <Button className="h-16 px-12 text-xl bg-gradient-gold text-charcoal font-bold group hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                     Plan Your Event
                     <ArrowRight size={22} className="ml-2 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>
                
                <Link href="/auth/signin">
                  <Button variant="outline" className="h-16 px-12 text-xl border-white/20 text-white hover:bg-white/5 transition-all">
                     Apply as Artist
                  </Button>
                </Link>
             </motion.div>
             
             {/* Trust Badges footer inside CTA */}
             <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 opacity-30">
                <div className="flex flex-col items-center space-y-2">
                   <Music size={24} className="text-gold" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Hand-Vetted Talent</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                   <Heart size={24} className="text-gold" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Seamless Experience</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                   <Star size={24} className="text-gold" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Velqora Exclusive</span>
                </div>
             </div>
          </div>
       </div>
    </section>
  )
}
