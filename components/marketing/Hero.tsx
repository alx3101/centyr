'use client'

import Link from 'next/link'
import { useTranslations } from '@/contexts/LanguageContext'
import MarketplaceFrame from './MarketplaceFrame'

export default function Hero() {
  const t = useTranslations()

  return (
    <section className="hero-v3">
        <div className="hero-v3-bg" />
        <div className="hero-v3-glow" />
        <div className="hero-v3-glow2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Copy */}
            <div className="v3-content">
              <div>
                <div className="hero-v3-badge">
                  <span className="hero-v3-badge-dot" />
                  {t.marketing.hero.badge}
                </div>
              </div>

              <h1 className="hero-v3-title">
                {t.marketing.hero.title}<br />
                <span className="highlight">{t.marketing.hero.titleHighlight}</span>
              </h1>

              <p className="hero-v3-sub">{t.marketing.hero.subtitle}</p>

              <div className="hero-v3-ctas">
                <Link href="/signup" className="v3-cta-main">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {t.marketing.hero.ctaPrimary}
                </Link>
                <Link href="#pricing" className="v3-cta-ghost">
                  {t.marketing.hero.ctaSecondary}
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="hero-v3-trust">
                {[
                  t.marketing.hero.trustNoCreditCard,
                  t.marketing.hero.trustFreeJobs,
                  t.marketing.hero.trustMoneyBack,
                ].map((item) => (
                  <div key={item} className="v3-trust-item">
                    <div className="v3-trust-icon">
                      <svg width="8" height="8" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

            </div>

            {/* Marketplace frame demo */}
            <div className="v3-visual">
              <MarketplaceFrame />
            </div>

          </div>
        </div>
      </section>
  )
}
