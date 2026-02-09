import Hero from '@/components/marketing/Hero'
import TrustBadges from '@/components/marketing/TrustBadges'
import TrustedBy from '@/components/marketing/TrustedBy'
import ValueProposition from '@/components/marketing/ValueProposition'
import HowItWorks from '@/components/marketing/HowItWorks'
import Features from '@/components/marketing/Features'
import LiveStats from '@/components/marketing/LiveStats'
import Security from '@/components/marketing/Security'
import Testimonials from '@/components/marketing/Testimonials'
import Pricing from '@/components/marketing/Pricing'
import FinalCTA from '@/components/marketing/FinalCTA'
import SocialProofNotification from '@/components/marketing/SocialProofNotification'

export const metadata = {
  title: 'Centyr - AI Product Photo Alignment',
  description: 'Align product photos in seconds with AI. No design skills needed.',
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <TrustedBy />
      <ValueProposition />
      <HowItWorks />
      <Features />
      <LiveStats />
      <Security />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <SocialProofNotification />
    </>
  )
}
