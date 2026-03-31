'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'
import { Star, Music, Award, ExternalLink, Play, Disc } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export function FeaturedArtists() {
  const containerRef = React.useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const artists = [
    {
      id: '1',
      name: 'Aria Seraphina',
      genre: 'Jazz & Soul Vocalist',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80',
      rating: 4.9,
      experience: 'Berklee Alumna',
      price: '$1,200+',
      isPremium: true
    },
    {
      id: '2',
      name: 'The Midnight Groove',
      genre: 'Funk & Jazz Band',
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80',
      rating: 5.0,
      experience: '15+ Years Exp.',
      price: '$2,500+',
      isPremium: true
    },
    {
      id: '3',
      name: 'DJ Kaze',
      genre: 'Electronic & Deep House',
      image: 'https://images.unsplash.com/photo-1571266028243-e4bb33394c14?auto=format&fit=crop&q=80',
      rating: 4.8,
      experience: 'Ibiza Resident',
      price: '$1,800+',
      isPremium: false
    },
    {
      id: '4',
      name: 'Luna Ray',
      genre: 'Pop & Acoustical Folk',
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80',
      rating: 4.9,
      experience: 'Universal Signed',
      price: '$900+',
      isPremium: true
    }
  ]

  return (
    <section id="artists" className="py-32 relative bg-charcoal-dark border-y border-gold/10" ref={containerRef}>
      {/* Background decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-gold/5 blur-[120px] opacity-20 pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-gold/5 blur-[100px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
             <motion.span 
               initial={{ opacity: 0, x: -20 }}
               animate={isInView ? { opacity: 1, x: 0 } : {}}
               className="text-gold font-bold uppercase tracking-[.4em] text-xs"
             >
               The Roster
             </motion.span>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight"
             >
               Elite <span className="italic">Performers</span> Curated for You.
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.2 }}
               className="text-white/50 text-lg md:text-xl font-light"
             >
               We only represent the top 1% of live performers, vetted for high-end events and exceptional talent.
             </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
             <Button variant="outline" className="border-gold/30 text-gold hover:bg-gold/10 h-14 px-8 text-lg font-bold">
               View Full Roster
             </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {artists.map((artist, idx) => (
             <motion.div
               key={artist.id}
               initial={{ opacity: 0, y: 30 }}
               animate={isInView ? { opacity: 1, y: 0 } : {}}
               transition={{ delay: 0.2 + (idx * 0.1), duration: 0.6 }}
             >
               <Card className="group relative overflow-hidden bg-charcoal border-gold/10 hover:border-gold/30 transition-all duration-500 h-full shadow-2xl">
                 {/* Premium Overlay */}
                 {artist.isPremium && (
                   <div className="absolute top-4 right-4 z-20">
                      <div className="bg-gold text-charcoal px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-xl flex items-center space-x-1">
                        <Award size={10} />
                        <span>Elite</span>
                      </div>
                   </div>
                 )}

                 {/* Image Section */}
                 <div className="relative aspect-[4/5] overflow-hidden">
                    <Image 
                      src={artist.image} 
                      alt={artist.name} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Play Button Mockup on Hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-50 group-hover:scale-100">
                       <div className="w-16 h-16 rounded-full bg-gold/90 flex items-center justify-center shadow-2xl">
                          <Play size={24} className="text-charcoal fill-charcoal ml-1" />
                       </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                       <span className="text-gold text-xs font-bold uppercase tracking-widest block mb-2">{artist.genre}</span>
                       <h3 className="text-2xl font-serif font-bold text-white">{artist.name}</h3>
                    </div>
                 </div>

                 {/* Content Section */}
                 <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                       <div className="flex items-center space-x-1">
                          <Star size={14} className="text-gold fill-gold" />
                          <span className="text-white text-sm font-semibold">{artist.rating}</span>
                       </div>
                       <div className="text-white/40 text-xs font-medium uppercase tracking-tighter">
                          {artist.experience}
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                       <div className="flex flex-col">
                          <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest uppercase">Pricing from</span>
                          <span className="text-gold font-serif font-bold text-lg">{artist.price}</span>
                       </div>
                       <button className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-charcoal transition-all">
                          <ExternalLink size={16} />
                       </button>
                    </div>
                 </CardContent>
               </Card>
             </motion.div>
           ))}
        </div>
        
        {/* Luxury Banner inside Featured section */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={isInView ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 0.8 }}
           className="mt-24 p-12 rounded-[2rem] bg-gradient-to-br from-charcoal-light to-charcoal border border-gold/10 relative overflow-hidden group shadow-2xl"
        >
           <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:opacity-40 transition-opacity" />
           <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                 <h3 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
                    Experience the <span className="text-gold">Velqora</span> Standard.
                 </h3>
                 <p className="text-white/60 leading-relaxed font-light">
                    Every performance is meticulously curated. We handle the aesthetics, the quality, and the exclusivity, so you can focus on the experience.
                 </p>
                 <div className="flex items-center space-x-6 text-gold/60 text-xs font-bold uppercase tracking-widest pt-4">
                    <span className="flex items-center space-x-2"><Disc size={16} /> <span>Vinyl Grade Audio</span></span>
                    <span className="flex items-center space-x-2"><Music size={16} /> <span>Custom Sets</span></span>
                 </div>
              </div>
              <div className="flex justify-end">
                 <Button className="h-16 px-12 text-lg bg-gold text-charcoal font-bold hover:scale-105 transition-transform">
                    Inquire for your Private Event
                 </Button>
              </div>
           </div>
        </motion.div>
      </div>
    </section>
  )
}
