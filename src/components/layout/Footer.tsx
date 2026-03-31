'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Mail, 
  MapPin, 
  Phone,
  Music,
  Star,
  Award,
  Circle
} from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    {
      title: 'Company',
      items: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Concierge', href: '/concierge' },
        { name: 'Impact', href: '/impact' },
      ]
    },
    {
      title: 'For Clients',
      items: [
        { name: 'Book Artists', href: '/artists' },
        { name: 'Experience Luxury', href: '/experience' },
        { name: 'Planning Tools', href: '/planning' },
        { name: 'Pricing Guide', href: '/pricing' },
      ]
    },
    {
      title: 'For Artists',
      items: [
        { name: 'Join the Roster', href: '/join' },
        { name: 'Success Stories', href: '/stories' },
        { name: 'Artist Dashboard', href: '/artist' },
        { name: 'Resources', href: '/resources' },
      ]
    }
  ]

  const socials = [
    { name: 'Contact', icon: <Mail size={20} />, href: 'mailto:concierge@velqora.com' },
    { name: 'Vibe', icon: <Circle size={20} />, href: '#' },
  ]

  return (
    <footer className="bg-charcoal pt-24 pb-12 relative overflow-hidden border-t border-gold/10">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 blur-[120px] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-start">
          {/* Logo column */}
          <div className="lg:col-span-1 flex flex-col space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-3xl font-serif font-bold tracking-[.3em] text-gold">
                VELQORA
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
               The premier marketplace for luxury live entertainment. Curating extraordinary moments for the world’s most exclusive events.
            </p>
            <div className="flex items-center space-x-4">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.href}
                  className="w-10 h-10 rounded-full border border-gold/10 flex items-center justify-center text-white/50 hover:border-gold hover:text-gold transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-12">
             {links.map((group) => (
               <div key={group.title} className="space-y-6">
                  <h4 className="text-gold font-bold uppercase tracking-[.3em] text-xs pb-2 border-b border-gold/10">{group.title}</h4>
                  <ul className="space-y-4">
                    {group.items.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href}
                          className="text-white/40 hover:text-gold transition-colors text-sm font-medium"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
               </div>
             ))}
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-24 pt-12 pb-12 border-y border-white/5 grid grid-cols-1 md:grid-cols-3 gap-12 text-center text-white/40">
           <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold"><Mail size={20} /></div>
              <span className="text-sm font-bold tracking-widest">concierge@velqora.com</span>
           </div>
           <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold"><MapPin size={20} /></div>
              <span className="text-sm font-bold tracking-widest">Palo Alto, California</span>
           </div>
           <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-gold/5 flex items-center justify-center text-gold"><Phone size={20} /></div>
              <span className="text-sm font-bold tracking-widest">+1 (888) VELQORA</span>
           </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 text-[10px] sm:text-[xs] font-bold uppercase tracking-[.4em] text-white/20">
           <div>© {currentYear} Velqora Private. All Rights Reserved.</div>
           <div className="flex items-center space-x-8">
             <Link href="/terms" className="hover:text-gold transition-colors">Terms of Service</Link>
             <Link href="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
             <Link href="/cookies" className="hover:text-gold transition-colors">Cookie Strategy</Link>
           </div>
        </div>
        
        {/* Certification Stamps (Mock) */}
        <div className="mt-12 flex justify-center space-x-12 opacity-10">
           <Award size={32} />
           <Music size={32} />
           <Star size={32} />
        </div>
      </div>
    </footer>
  )
}
