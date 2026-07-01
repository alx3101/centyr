'use client'

import { useTranslations } from '@/contexts/LanguageContext'
import { STORE_LOGOS } from './StoreLogos'

export default function TrustedBy() {
  const t = useTranslations()

  return (
    <section className="py-20 bg-white border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: '#7c3aed' }}
        >
          {t.marketing.trustedBy.tagline}
        </p>
        <h2
          className="text-2xl md:text-3xl font-extrabold mb-3"
          style={{ color: '#0f0a1e', letterSpacing: '-0.02em' }}
        >
          {t.marketing.trustedBy.subtitle}
        </h2>
        <p
          className="text-sm mb-12 max-w-lg mx-auto"
          style={{ color: '#9ca3af', lineHeight: 1.7 }}
        >
          {t.marketing.trustedBy.description}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STORE_LOGOS.map((store) => (
            <div
              key={store.key}
              className="flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-200"
              style={{
                backgroundColor: '#faf5ff',
                borderColor: '#e9d5ff',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = store.brandColor
                el.style.boxShadow = `0 4px 20px ${store.brandColor}22`
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement
                el.style.borderColor = '#e9d5ff'
                el.style.boxShadow = 'none'
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${store.brandColor}18`, color: store.brandColor }}
              >
                <store.Logo size={26} />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: '#0f0a1e' }}>{store.name}</p>
                <p className="text-xs mt-0.5" style={{ color: '#9ca3af' }}>
                  {store.width} × {store.height} px
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
