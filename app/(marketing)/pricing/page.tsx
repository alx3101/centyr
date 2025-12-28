import Navbar from '@/components/marketing/Navbar'
import Pricing from '@/components/marketing/Pricing'
import Footer from '@/components/marketing/Footer'

export default function PricingPage() {
  return (
    <main>
      <Navbar />
      <div className="py-20">
        <Pricing />
      </div>
      <Footer />
    </main>
  )
}
