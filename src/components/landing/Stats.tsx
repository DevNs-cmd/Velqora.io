'use client'

import React from 'react'
import { motion, useInView } from 'framer-motion'

export function Stats() {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })

  const items = [
    { label: 'Performances', value: '12,000+' },
    { label: 'Top-Tier Artists', value: '500+' },
    { label: 'Average Rating', value: '4.95/5' },
    { label: 'Event Types', value: '50+' },
  ]

  return (
    <section className="py-24 bg-charcoal" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center items-center">
           {items.map((item, idx) => (
             <motion.div
               key={item.label}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={isInView ? { opacity: 1, scale: 1 } : {}}
               transition={{ delay: idx * 0.1, duration: 0.5 }}
               className="space-y-2 border-r border-gold/10 last:border-r-0"
             >
                <div className="text-4xl md:text-6xl font-serif font-bold text-gold">{item.value}</div>
                <div className="text-xs md:text-sm font-bold uppercase tracking-[.3em] text-white/40">{item.label}</div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
