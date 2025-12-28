import Link from 'next/link'

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-32 gradient-animated text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLTItNC00LTRzLTQgMi00IDQgMiA0IDQgNCA0LTIgNC00em0wLTMwYzAtMi0yLTQtNC00cy00IDItNCA0IDIgNCA0IDQgNC0yIDQtNHptMzAgMGMwLTItMi00LTQtNHMtNCAyLTQgNCAyIDQgNCA0IDQtMiA0LTR6TTYgNGMwLTItMi00LTQtNFMtMiAyLTIgNHMyIDQgNCA0IDQtMiA0LTR6TTM2IDY0YzAtMi0yLTQtNC00cy00IDItNCA0IDIgNCA0IDQgNC0yIDQtNHptMzAgMGMwLTItMi00LTQtNHMtNCAyLTQgNCAyIDQgNCA0IDQtMiA0LTR6TTYgMzRjMC0yLTItNC00LTRzLTQgMi00IDQgMiA0IDQgNCA0LTIgNC00ek02IDY0YzAtMi0yLTQtNC00cy00IDItNCA0IDIgNCA0IDQgNC0yIDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
          Start Creating Perfect Product Photos Today
        </h2>
        <p className="text-xl text-purple-100 mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Join 1,000+ stores that trust Centyr for professional product photography
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <Link
            href="/upload"
            className="bg-white text-fuchsia-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-2xl inline-block"
          >
            Start Free Trial
          </Link>
          <Link
            href="#contact"
            className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-fuchsia-600 hover:scale-105 transition-all duration-300 inline-block"
          >
            Book a Demo
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-purple-100 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free 14-day trial
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            No credit card required
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Cancel anytime
          </span>
        </div>
      </div>
    </section>
  )
}
