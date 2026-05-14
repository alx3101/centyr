import dynamic from 'next/dynamic'
import Hero from '@/components/marketing/Hero'

const TrustedBy   = dynamic(() => import('@/components/marketing/TrustedBy'))
const HowItWorks  = dynamic(() => import('@/components/marketing/HowItWorks'))
const Features    = dynamic(() => import('@/components/marketing/Features'))
const Testimonials = dynamic(() => import('@/components/marketing/Testimonials'))
const Pricing     = dynamic(() => import('@/components/marketing/Pricing'))
const FinalCTA    = dynamic(() => import('@/components/marketing/FinalCTA'))

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
