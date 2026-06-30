'use client'

import { useTranslations } from '@/contexts/LanguageContext'
import { STORE_LOGOS } from './StoreLogos'

export default function TrustedBy() {
  const t = useTranslations()

  // Build the full list doubled for seamless marquee loop
  const allStores = [...STORE_LOGOS, ...STORE_LOGOS]

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-1"
          style={{ color: '#7c3aed' }}
        >
          {t.marketing.trustedBy.tagline}
        </p>
        <p
          className="text-base font-medium"
          style={{ color: '#6b7280' }}
        >
          {t.marketing.trustedBy.subtitle}
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10"
          style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10"
          style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }}
        />

        <div className="flex gap-3 marquee-track">
          {allStores.map((store, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold border transition-colors duration-200 flex-shrink-0"
              style={{
                backgroundColor: '#faf5ff',
                borderColor: '#e9d5ff',
                color: '#0f0a1e',
              }}
            >
              <store.Logo size={16} className="flex-shrink-0" />
              {store.name}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee-track {
          animation: marquee-scroll 28s linear infinite;
          width: max-content;
        }
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
