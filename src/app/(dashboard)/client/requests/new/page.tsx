'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  MapPin, 
  Music, 
  DollarSign, 
  Users, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  CheckCircle2,
  Trash,
  Star,
  Award,
  GlassWater
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

const eventTypes = [
  { id: 'wedding', label: 'Wedding', icon: Star },
  { id: 'corporate', label: 'Corporate Event', icon: Award },
  { id: 'party', label: 'Private Party', icon: Music },
  { id: 'gala', label: 'Luxury Gala', icon: Sparkles },
  { id: 'cocktail', label: 'Cocktail Soirée', icon: GlassWater },
]

const vibeTypes = [
  'Romantic', 'EDM', 'Bollywood', 'Classical', 'Jazz', 'Pop', 'Soul', 'Deep House', 'Opera', 'Funk'
]

export default function NewRequestPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    eventType: '',
    date: '',
    location: '',
    budget: { min: 1000, max: 5000 },
    vibe: [] as string[],
    guestCount: '',
    notes: '',
  })

  const handleNext = () => setStep(step + 1)
  const handlePrev = () => setStep(step - 1)

  const handleSubmit = async () => {
    toast.success('Analyzing requirements...', {
      description: 'Matching with world-class performers.',
    })
    // Simulate API call
    setTimeout(() => {
      toast.success('Successfully Created!', {
        description: 'Your request is now live. Top artists are being notified.',
      })
      router.push('/client')
    }, 2000)
  }

  const toggleVibe = (v: string) => {
    setFormData(prev => ({
      ...prev,
      vibe: prev.vibe.includes(v) 
        ? prev.vibe.filter(item => item !== v) 
        : [...prev.vibe, v]
    }))
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-24">
       <div className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white"
          >
             Curation of <span className="text-gold italic">Artistry.</span>
          </motion.h1>
          <p className="text-white/40 text-lg font-light">Tell us about your event and let the finest performers reach out.</p>
       </div>

       {/* PROGRESS INDICATOR */}
       <div className="flex items-center space-x-6">
          {[1,2,3].map(i => (
             <div key={i} className="flex items-center space-x-3">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-500",
                  step >= i 
                    ? "bg-gold border-gold text-charcoal shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                    : "bg-white/5 border-white/10 text-white/30"
                )}>
                   {step > i ? <CheckCircle2 size={16} /> : i}
                </div>
                {i < 3 && <div className={cn("w-12 h-px transition-all duration-700", step > i ? "bg-gold" : "bg-white/10")} />}
             </div>
          ))}
       </div>

       {/* FORM STEPS */}
       <motion.div 
         key={step}
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
         className="space-y-12"
       >
          {step === 1 && (
             <div className="space-y-12">
                <div className="space-y-6">
                   <h3 className="text-2xl font-serif font-bold text-white">Event Essentials</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Event Title</label>
                         <Input 
                            placeholder="e.g., Royal Wedding Reception" 
                            className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-gold transition-colors"
                            value={formData.title}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Guest Count</label>
                         <Input 
                            placeholder="e.g., 200 - 500 Guests" 
                            className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-gold transition-colors"
                            value={formData.guestCount}
                            onChange={e => setFormData({...formData, guestCount: e.target.value})}
                         />
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-2xl font-serif font-bold text-white">Select Experience Type</h3>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {eventTypes.map(type => (
                         <button
                           key={type.id}
                           onClick={() => setFormData({...formData, eventType: type.id})}
                           className={cn(
                             "p-6 rounded-2xl flex flex-col items-center space-y-4 border transition-all duration-300 group",
                             formData.eventType === type.id 
                               ? "bg-gold border-gold text-charcoal shadow-2xl" 
                               : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:bg-white/10"
                           )}
                         >
                            <type.icon size={28} className={formData.eventType === type.id ? "text-charcoal" : "text-gold/40 group-hover:text-gold transition-colors"} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-center">{type.label}</span>
                         </button>
                      ))}
                   </div>
                </div>
             </div>
          )}

          {step === 2 && (
             <div className="space-y-12">
                <div className="space-y-6">
                   <h3 className="text-2xl font-serif font-bold text-white">Date & Atmosphere</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Event Date</label>
                         <div className="relative">
                            <Input 
                               type="date"
                               className="bg-white/5 border-white/10 text-white h-14 rounded-xl focus:border-gold transition-colors"
                               value={formData.date}
                               onChange={e => setFormData({...formData, date: e.target.value})}
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Location</label>
                         <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-60" size={18} />
                            <Input 
                               placeholder="e.g., Beverly Hills, CA" 
                               className="bg-white/5 border-white/10 text-white h-14 rounded-xl pl-12 focus:border-gold transition-colors"
                               value={formData.location}
                               onChange={e => setFormData({...formData, location: e.target.value})}
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <h3 className="text-2xl font-serif font-bold text-white">Desired Vibe</h3>
                   <div className="flex flex-wrap gap-3">
                      {vibeTypes.map(v => (
                         <button
                           key={v}
                           onClick={() => toggleVibe(v)}
                           className={cn(
                             "px-6 py-2.5 rounded-full text-xs font-bold tracking-widest border transition-all",
                             formData.vibe.includes(v) 
                               ? "bg-gold text-charcoal border-gold shadow-xl" 
                               : "bg-white/5 border-white/10 text-white/30 hover:border-gold/30 hover:text-gold"
                           )}
                         >
                            {v}
                         </button>
                      ))}
                   </div>
                </div>
             </div>
          )}

          {step === 3 && (
             <div className="space-y-12">
                <div className="space-y-6">
                   <h3 className="text-2xl font-serif font-bold text-white">Investment & Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Min Budget ($)</label>
                         <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-60" size={18} />
                            <Input 
                               type="number"
                               className="bg-white/5 border-white/10 text-white h-14 rounded-xl pl-12 focus:border-gold transition-colors"
                               value={formData.budget.min}
                               onChange={e => setFormData({...formData, budget: {...formData.budget, min: parseInt(e.target.value)}})}
                            />
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Max Budget ($)</label>
                         <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gold opacity-60" size={18} />
                            <Input 
                               type="number"
                               className="bg-white/5 border-white/10 text-white h-14 rounded-xl pl-12 focus:border-gold transition-colors"
                               value={formData.budget.max}
                               onChange={e => setFormData({...formData, budget: {...formData.budget, max: parseInt(e.target.value)}})}
                            />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gold opacity-60">Additional Notes / Special Requests</label>
                   <Textarea 
                      placeholder="Share your vision. What makes this event special?" 
                      className="bg-white/5 border-white/10 text-white min-h-[150px] rounded-2xl p-6 focus:border-gold transition-colors text-lg font-light leading-relaxed"
                      value={formData.notes}
                      onChange={e => setFormData({...formData, notes: e.target.value})}
                   />
                </div>
                
                {/* Summary Card */}
                <div className="p-8 rounded-[2rem] bg-gold/5 border border-gold/10">
                   <div className="flex items-center space-x-4 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold"><Sparkles size={16} /></div>
                      <span className="text-sm font-serif font-bold text-white">Concierge Summary</span>
                   </div>
                   <p className="text-white/40 text-sm leading-relaxed">
                      You are requesting a world-class <span className="text-white font-bold">{formData.eventType || 'performance'}</span> for <span className="text-white font-bold">{formData.guestCount || 'your guests'}</span> on <span className="text-white font-bold">{formData.date || 'TBD'}</span>. We will notify the elite artists matching your <span className="text-gold font-bold">${formData.budget.min}-${formData.budget.max}</span> investment.
                   </p>
                </div>
             </div>
          )}

          {/* ACTIONS */}
          <div className="flex items-center justify-between pt-12">
             {step > 1 ? (
                <Button 
                  variant="ghost" 
                  onClick={handlePrev}
                  className="text-white/40 hover:text-gold hover:bg-gold/5 group"
                >
                   <ChevronLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                   Previous Step
                </Button>
             ) : (
                <div />
             )}

             <Button 
               onClick={step === 3 ? handleSubmit : handleNext}
               className={cn(
                 "h-16 px-12 text-lg font-bold group",
                 step === 3 ? "bg-gold text-charcoal shadow-[0_0_30px_rgba(212,175,55,0.4)]" : "bg-white/10 text-white hover:bg-white/15"
               )}
             >
                {step === 3 ? "Submit Request" : "Next Step"}
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>
       </motion.div>
    </div>
  )
}
