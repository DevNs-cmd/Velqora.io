'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Music, Star, Award, ShieldCheck, Mail, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

function SignInForm() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role) {
      const role = session.user.role
      if (role === 'ADMIN') router.push('/admin')
      else if (role === 'ARTIST') router.push('/artist')
      else if (role === 'CLIENT') router.push('/client')
    }
  }, [status, session, router])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('google', { callbackUrl })
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
           className="w-full max-w-sm space-y-12"
         >
            <div className="space-y-4 text-center lg:text-left">
               <h2 className="text-3xl md:text-5xl font-serif font-bold text-white">Welcome Back.</h2>
               <p className="text-white/40 font-light">Access your exclusive Velqora dashboard.</p>
            </div>

            {/* MAIN AUTH */}
            <div className="space-y-6">
               <Button
                 disabled={isLoading}
                 onClick={handleGoogleSignIn}
                 className="w-full h-16 bg-white hover:bg-white/90 text-charcoal font-bold text-lg rounded-xl flex items-center justify-center space-x-4 transition-all shadow-2xl relative overflow-hidden group"
               >
                 {isLoading ? (
                   <span className="animate-pulse">Connecting...</span>
                 ) : (
                   <>
                     <Image 
                       src="https://www.google.com/favicon.ico" 
                       alt="Google" 
                       width={20} 
                       height={20} 
                       className="group-hover:scale-110 transition-transform"
                     />
                     <span>Continue with Google</span>
                   </>
                 )}
               </Button>
               
               <div className="flex items-center space-x-4 opacity-10 py-2">
                  <div className="flex-1 h-px bg-white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white">Velqora Secure</span>
                  <div className="flex-1 h-px bg-white" />
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <Button
                    variant="outline"
                    className="h-16 border-gold/20 text-white/60 hover:text-white hover:border-gold/40 hover:bg-white/5 rounded-xl flex items-center justify-center space-x-3 transition-all"
                  >
                     <Mail size={18} className="text-gold" />
                     <span>Concierge Access (Invite Only)</span>
                  </Button>
               </div>
            </div>

            <p className="text-[10px] text-center text-white/30 font-bold uppercase tracking-widest">
               By continuing, you agree to our <Link href="/terms" className="text-gold hover:underline">Terms</Link> and <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
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
