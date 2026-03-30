'use client'

import { useTranslations } from '@/contexts/LanguageContext'

const industryCategories = [
  { key: 'catFashion', icon: '👗' },
  { key: 'catElectronics', icon: '📱' },
  { key: 'catHome', icon: '🏡' },
  { key: 'catSports', icon: '⚽' },
  { key: 'catCosmetics', icon: '💄' },
  { key: 'catFood', icon: '🍽️' },
]

// Extra labels not in translations — hardcoded but neutral
const extraCategories = [
  { label: 'Jewelry', icon: '💎' },
  { label: 'Furniture', icon: '🪑' },
]

export default function TrustedBy() {
  const t = useTranslations()

  const categories = industryCategories.map((c) => ({
    label: t.marketing.trustedBy[c.key as keyof typeof t.marketing.trustedBy] as string,
    icon: c.icon,
  }))

  // Build the full list doubled for seamless marquee loop
  const allCategories = [
    ...categories,
    ...extraCategories,
    ...categories,
    ...extraCategories,
  ]

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
          Usato da e-commerce in ogni settore
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
          {allCategories.map((cat, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 flex-shrink-0"
              style={{
                backgroundColor: '#faf5ff',
                borderColor: '#e9d5ff',
                color: '#0f0a1e',
              }}
            >
              <span className="text-base leading-none">{cat.icon}</span>
              {cat.label}
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
