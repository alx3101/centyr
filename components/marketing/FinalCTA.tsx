'use client'

import Link from 'next/link'
import { useTranslations } from '@/contexts/LanguageContext'

export default function FinalCTA() {
  const t = useTranslations()

  const trustItems = [
    {
      text: t.marketing.finalCta.trustNoCreditCard,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
    {
      text: t.marketing.finalCta.trustFreeJobs,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
        </svg>
      ),
    },
    {
      text: t.marketing.finalCta.trustMoneyBack,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ]

  return (
    <section
      className="py-20 md:py-28"
      style={{ backgroundColor: '#0f0a1e' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <span
          className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8"
          style={{ backgroundColor: 'rgba(124,58,237,0.2)', color: '#c4b5fd' }}
        >
          {t.marketing.finalCta.badge}
        </span>

        {/* Headline */}
        <h2
          className="text-4xl md:text-6xl font-black mb-6 text-white"
          style={{ letterSpacing: '-0.04em', lineHeight: '1.1' }}
        >
          {t.marketing.finalCta.title}
          <br />
          <span
            style={{
              backgroundImage: 'linear-gradient(135deg, #a78bfa 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {t.marketing.finalCta.titleLine2}
          </span>
        </h2>

        {/* Subtitle */}
        <p
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: '#9ca3af', lineHeight: '1.7' }}
        >
          {t.marketing.finalCta.subtitle}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
              boxShadow: '0 8px 30px rgba(124,58,237,0.4)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {t.marketing.finalCta.ctaPrimary}
          </Link>

          <Link
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all duration-200 hover:bg-white/10"
            style={{
              color: '#d1d5db',
              border: '1.5px solid rgba(255,255,255,0.15)',
            }}
          >
            {t.marketing.finalCta.ctaSecondary}
          </Link>
        </div>

        {/* Trust items */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm"
              style={{ color: '#6b7280' }}
            >
              <span style={{ color: '#7c3aed' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
