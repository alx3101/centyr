import Hero from '@/components/marketing/Hero'
import TrustedBy from '@/components/marketing/TrustedBy'
import HowItWorks from '@/components/marketing/HowItWorks'
import Features from '@/components/marketing/Features'
import Testimonials from '@/components/marketing/Testimonials'
import Pricing from '@/components/marketing/Pricing'
import FinalCTA from '@/components/marketing/FinalCTA'

export const metadata = {
  title: 'Centyr - AI Product Photo Alignment',
  description: 'Align product photos in seconds with AI. No design skills needed.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FinalCTA />
    </>
  )
}
