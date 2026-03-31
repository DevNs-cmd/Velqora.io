'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, Star, Award, ShieldCheck, Mail, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

function SignInForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'CLIENT' as 'CLIENT' | 'ARTIST' | 'ADMIN'
  })

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      const role = session.user.role
      if (role === 'ADMIN') router.push('/admin')
      else if (role === 'ARTIST') router.push('/artist')
      else if (role === 'CLIENT') router.push('/client')
    }
  }, [status, session, router])

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) return

    setIsLoading(true)
    try {
      await signIn('credentials', { 
        ...formData,
        callbackUrl 
      })
    } catch (error) {
      console.error('Sign in error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-charcoal selection:bg-gold selection:text-charcoal overflow-hidden font-sans">
      {/* Left Column: Visuals & Branding */}
      <div className="hidden lg:flex flex-col relative overflow-hidden p-12 bg-charcoal-dark border-r border-gold/10">
         {/* Ambient Backlight */}
         <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-40 pointer-events-none" />
         
         <div className="relative z-10 flex flex-col justify-between h-full">
            <Link href="/" className="flex items-center space-x-2 group">
              <span className="text-4xl font-serif font-bold tracking-[.3em] text-gold">
                VELQORA
              </span>
            </Link>

            <div className="space-y-12">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="space-y-6"
               >
                  <h1 className="text-5xl font-serif font-bold text-white leading-tight">
                    Experience the <span className="text-gold italic">Artistry</span> of Premium Performance.
                  </h1>
                  <p className="text-white/40 text-xl font-light leading-relaxed max-w-md">
                     Sign in to access the world’s most elite pool of live talent for your next exclusive event.
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 gap-8 opacity-60">
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20"><Star size={18} /></div>
                     <span className="text-sm font-bold uppercase tracking-[.2em] text-white/80">Curated Talent Only</span>
                  </div>
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20"><ShieldCheck size={18} /></div>
                     <span className="text-sm font-bold uppercase tracking-[.2em] text-white/80">Secure Bookings</span>
                  </div>
                  <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold border border-gold/20"><Award size={18} /></div>
                     <span className="text-sm font-bold uppercase tracking-[.2em] text-white/80">Premium Concierge</span>
                  </div>
               </div>
            </div>

            <div className="text-[10px] sm:text-xs font-bold uppercase tracking-[.4em] text-white/20">
               © {new Date().getFullYear()} Velqora Private. Standard of Excellence.
            </div>
         </div>
         
         {/* Background graphic */}
         <div className="absolute -bottom-20 -right-20 w-[150%] h-[50%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light" />
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex flex-col items-center justify-center p-8 md:p-12 lg:p-24 bg-charcoal">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="w-full max-w-sm space-y-10"
         >
            <div className="space-y-6 text-center lg:text-left flex flex-col items-center lg:items-start">
               <div className="w-24 h-24 relative mb-2 rounded-full border-2 border-gold/30 overflow-hidden bg-black shadow-2xl">
                  <Image 
                    src="/logo.jpg" 
                    alt="Velqora Logo" 
                    fill 
                    className="object-contain p-4"
                  />
               </div>
               <div className="space-y-2">
                 <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Guest Access.</h2>
                 <p className="text-white/40 font-light">Enter details to access the premium portal as any role.</p>
               </div>
            </div>

            {/* MAIN AUTH */}
            <form onSubmit={handleSignIn} className="space-y-6">
               <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold/60 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="demo@velqora.com"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold/60 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white focus:border-gold/50 outline-none transition-all placeholder:text-white/10"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gold/60 ml-1">Portal View</label>
                    <div className="grid grid-cols-3 gap-2">
                       {(['CLIENT', 'ARTIST', 'ADMIN'] as const).map((r) => (
                         <button
                           key={r}
                           type="button"
                           onClick={() => setFormData({...formData, role: r})}
                           className={cn(
                             "h-12 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all border",
                             formData.role === r 
                               ? "bg-gold text-charcoal border-gold" 
                               : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                           )}
                         >
                            {r}
                         </button>
                       ))}
                    </div>
                  </div>
               </div>

               <Button
                 disabled={isLoading}
                 type="submit"
                 className="w-full h-16 bg-white hover:bg-white/90 text-charcoal font-bold text-lg rounded-xl flex items-center justify-center space-x-4 transition-all shadow-2xl relative overflow-hidden group"
               >
                 {isLoading ? (
                   <span className="animate-pulse tracking-widest uppercase text-sm">Authenticating Securely...</span>
                 ) : (
                   <>
                     <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                     <span className="uppercase tracking-[.2em] text-sm">Enter Portal</span>
                   </>
                 )}
               </Button>
            </form>

            <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-widest leading-loose">
               Secure testing environment. Data is persisted per email. <br/>
               By entering, you agree to the <Link href="/terms" className="text-gold hover:underline">Terms of Service</Link>.
            </p>
         </motion.div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="text-gold font-serif animate-pulse text-2xl tracking-[.4em]">VELQORA</div>
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
