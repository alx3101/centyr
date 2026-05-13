import Hero from '@/components/marketing/Hero'
import TrustedBy from '@/components/marketing/TrustedBy'
import HowItWorks from '@/components/marketing/HowItWorks'
import Features from '@/components/marketing/Features'
import Testimonials from '@/components/marketing/Testimonials'
import Pricing from '@/components/marketing/Pricing'
import FinalCTA from '@/components/marketing/FinalCTA'

export const metadata = {
  title: 'Centyr - Product Photo Standardization for E-commerce',
  description: 'Align and center product photos in seconds. No design skills needed. Ready for any marketplace.',
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
