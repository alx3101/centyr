'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from '@/contexts/LanguageContext'

export default function Hero() {
  const t = useTranslations()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    setSliderPosition(Math.max(0, Math.min((x / rect.width) * 100, 100)))
  }
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    setSliderPosition(Math.max(0, Math.min((x / rect.width) * 100, 100)))
  }

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

            {/* Slider */}
            <div className="v3-visual">
              <div
                className="v3-slider-wrap"
                onMouseMove={handleMouseMove}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                <div className="absolute inset-0 bg-gray-100">
                  <img src="/before.webp" alt="Prima" className="w-full h-full object-cover" width={1000} height={1000} fetchPriority="high" />
                </div>
                <div
                  className="absolute inset-0 bg-white"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img src="/after.webp" alt="Dopo" className="w-full h-full object-cover" width={1000} height={1000} />
                </div>

                <div className="v3-slider-label" style={{ left: 14 }}>{t.marketing.hero.before}</div>
                <div className="v3-slider-label" style={{ right: 14 }}>{t.marketing.hero.after}</div>

                <div className="v3-slider-line" style={{ left: `${sliderPosition}%` }}>
                  <div className="v3-slider-handle">
                    <svg width="18" height="18" fill="none" stroke="#7c3aed" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                    </svg>
                  </div>
                </div>

                {/* Floating chip */}
                <div className="v3-result-chip">
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px rgba(34,197,94,0.8)', flexShrink: 0 }} />
                  <div>
                    <div className="v3-result-chip-text">Elaborato in 18 sec</div>
                    <div className="v3-result-chip-sub">2000 × 2000px · WEBP</div>
                  </div>
                </div>
              </div>

              <p className="text-center text-xs mt-3 text-gray-400" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {t.marketing.hero.dragToCompare}
              </p>
            </div>

          </div>
        </div>
      </section>
  )
}
