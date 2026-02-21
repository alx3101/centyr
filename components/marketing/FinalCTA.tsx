import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-purple-700 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-fuchsia-300 rounded-full filter blur-3xl opacity-20"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="text-sm font-semibold text-white">Start processing in under 60 seconds</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Ready to Transform Your<br />Product Images?
        </h2>
        <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
          Join 1,000+ stores using professional AI to perfect their product photos. Start free, no credit card required.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Start Free Trial
          </Link>
          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 bg-transparent text-white px-8 py-4 rounded-xl text-lg font-bold border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-300"
          >
            View Pricing
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-purple-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>3 free jobs/month</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  )
}
