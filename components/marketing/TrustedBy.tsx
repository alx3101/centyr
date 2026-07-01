'use client'

import { useTranslations } from '@/contexts/LanguageContext'
import { STORE_LOGOS } from './StoreLogos'

export default function TrustedBy() {
  const t = useTranslations()

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-1"
          style={{ color: '#7c3aed' }}
        >
          {t.marketing.trustedBy.tagline}
        </p>
        <p
          className="text-base font-medium mb-10"
          style={{ color: '#6b7280' }}
        >
          {t.marketing.trustedBy.subtitle}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {STORE_LOGOS.map((store) => (
            <div
              key={store.key}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl border text-sm font-semibold"
              style={{
                backgroundColor: '#faf5ff',
                borderColor: '#e9d5ff',
                color: '#0f0a1e',
              }}
            >
              <store.Logo size={18} className="flex-shrink-0" />
              {store.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
