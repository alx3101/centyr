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
  description: 'Set your catalog standard once and it stays matched. A 200-product catalog aligned in ~10 minutes instead of ~20 hours by hand.',
}

export default function Home() {
  return (
    <>
      {/* Short hook, then immediately the cost/time contrast (old way vs new way),
          so the €300-per-season anchor lands before we explain the mechanism. */}
      <Hero />
      <Testimonials />
      <TrustedBy />
      <HowItWorks />
      <Features />
      <Pricing />
      <FinalCTA />
    </>
  )
}
