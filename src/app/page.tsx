import { Navbar } from '@/components/layout/Navbar'
import { Hero } from '@/components/landing/Hero'
import { FeaturedArtists } from '@/components/landing/FeaturedArtists'
import { Stats } from '@/components/landing/Stats'
import { CTA } from '@/components/landing/CTA'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal overflow-x-hidden">
      <Navbar />
      <Hero />
      <FeaturedArtists />
      <Stats />
      <CTA />
      <Footer />
    </main>
  )
}
