'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Construction, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function ComingSoon({ title, description, backHref }: { title: string, description: string, backHref: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-20 h-20 rounded-3xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold mb-4"
      >
        <Construction size={40} />
      </motion.div>
      
      <div className="space-y-4 max-w-md">
        <h1 className="text-4xl font-serif font-bold text-white italic">
          {title} <span className="text-gold">Soon.</span>
        </h1>
        <p className="text-white/40 font-light leading-relaxed">
          {description} Our elite curation team is finalizing this experience to ensure it meet our standards of excellence.
        </p>
      </div>

      <div className="pt-4">
        <Link href={backHref}>
          <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/5 space-x-2">
            <ChevronLeft size={16} />
            <span>Return to Dashboard</span>
          </Button>
        </Link>
      </div>

      {/* Decorative pulse */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] animate-pulse" />
      </div>
    </div>
  )
}
