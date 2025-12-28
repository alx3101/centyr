import Hero from '@/components/marketing/Hero'
import ValueProposition from '@/components/marketing/ValueProposition'
import HowItWorks from '@/components/marketing/HowItWorks'
import Features from '@/components/marketing/Features'
import WhoItsFor from '@/components/marketing/WhoItsFor'
import Pricing from '@/components/marketing/Pricing'
import DemoVideo from '@/components/marketing/DemoVideo'
import Testimonials from '@/components/marketing/Testimonials'
import FAQ from '@/components/marketing/FAQ'
import FinalCTA from '@/components/marketing/FinalCTA'
import Footer from '@/components/marketing/Footer'
import Navbar from '@/components/marketing/Navbar'

export const metadata = {
  title: 'Centyr - Align Product Photos Automatically | AI Image Alignment for E-commerce',
  description: 'Automatically align and center your product photos in seconds. AI-powered tool removes shadows and creates perfectly aligned images for your online store. Start free.',
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValueProposition />
      <HowItWorks />
      <Features />
      <WhoItsFor />
      <Pricing />
      <DemoVideo />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
