'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useTranslations } from '@/contexts/LanguageContext'

export default function Hero() {
  const t = useTranslations()
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [photoCount, setPhotoCount] = useState(48312)

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoCount(prev => prev + Math.floor(Math.random() * 3))
    }, 2800)
    return () => clearInterval(interval)
  }, [])

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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700;800;900&display=swap');

        .hero-v3 {
          background: #ffffff;
          position: relative;
          overflow: hidden;
          padding: 80px 0 72px;
        }

        /* Subtle dot grid background */
        .hero-v3-bg {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, #d8b4fe22 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* Top-right soft glow */
        .hero-v3-glow {
          position: absolute;
          width: 640px;
          height: 640px;
          background: radial-gradient(ellipse at top right, #f0e7ff 0%, transparent 65%);
          top: -120px;
          right: -80px;
          pointer-events: none;
        }

        /* Bottom-left accent */
        .hero-v3-glow2 {
          position: absolute;
          width: 400px;
          height: 300px;
          background: radial-gradient(ellipse, #fce7ff 0%, transparent 70%);
          bottom: -60px;
          left: -60px;
          pointer-events: none;
        }

        .hero-v3-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #faf5ff;
          border: 1.5px solid #e9d5ff;
          padding: 5px 13px;
          border-radius: 100px;
          font-family: 'Onest', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #7c3aed;
          margin-bottom: 26px;
        }

        .hero-v3-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34,197,94,0.85);
          animation: v3dot 2.2s ease-in-out infinite;
        }
        @keyframes v3dot {
          0%,100% { opacity:1; } 50% { opacity:0.5; }
        }

        .hero-v3-title {
          font-family: 'Onest', sans-serif;
          font-size: clamp(2.6rem, 5.5vw, 4.4rem);
          font-weight: 800;
          color: #0f0a1e;
          line-height: 1.06;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }

        .hero-v3-title .highlight {
          background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-v3-sub {
          font-family: 'Onest', sans-serif;
          font-size: 1.05rem;
          font-weight: 300;
          color: #6b7280;
          max-width: 400px;
          line-height: 1.72;
          margin-bottom: 34px;
        }

        .hero-v3-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          margin-bottom: 32px;
        }

        .v3-cta-main {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #7c3aed 0%, #c026d3 100%);
          color: #fff;
          font-family: 'Onest', sans-serif;
          font-size: 15px;
          font-weight: 700;
          padding: 13px 26px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.18s ease;
          letter-spacing: -0.02em;
          box-shadow: 0 4px 20px rgba(124,58,237,0.28);
        }
        .v3-cta-main:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 28px rgba(124,58,237,0.38);
        }

        .v3-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          color: #6b7280;
          font-family: 'Onest', sans-serif;
          font-size: 14px;
          font-weight: 400;
          text-decoration: none;
          padding: 13px 6px;
          transition: color 0.15s;
        }
        .v3-cta-ghost:hover { color: #111827; }

        .hero-v3-trust {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          margin-bottom: 22px;
        }

        .v3-trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: 'Onest', sans-serif;
          font-size: 12.5px;
          color: #9ca3af;
        }

        .v3-trust-icon {
          width: 15px; height: 15px;
          border-radius: 50%;
          background: #dcfce7;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        .v3-counter {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 100px;
          padding: 6px 14px;
          font-family: 'Onest', sans-serif;
          font-size: 12.5px;
          color: #9ca3af;
        }
        .v3-counter strong {
          color: #111827;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
        }

        /* Slider */
        .v3-slider-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px #e9d5ff,
            0 32px 64px rgba(124,58,237,0.12),
            0 8px 24px rgba(0,0,0,0.08);
          cursor: ew-resize;
          user-select: none;
          aspect-ratio: 1/1;
        }

        .v3-slider-label {
          position: absolute;
          top: 14px;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(0,0,0,0.08);
          color: #374151;
          font-family: 'Onest', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: 6px;
          z-index: 10;
        }

        .v3-slider-line {
          position: absolute;
          top: 0; bottom: 0;
          width: 2px;
          background: #7c3aed;
          box-shadow: 0 0 12px rgba(124,58,237,0.5);
          z-index: 10;
        }

        .v3-slider-handle {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 42px; height: 42px;
          background: #fff;
          border-radius: 50%;
          border: 2px solid #e9d5ff;
          box-shadow: 0 4px 16px rgba(124,58,237,0.2);
          display: flex; align-items: center; justify-content: center;
        }

        /* Floating result chip */
        .v3-result-chip {
          position: absolute;
          bottom: 18px;
          right: 18px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          border: 1px solid #e9d5ff;
          border-radius: 10px;
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 10;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
        }
        .v3-result-chip-text {
          font-family: 'Onest', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.01em;
        }
        .v3-result-chip-sub {
          font-family: 'Onest', sans-serif;
          font-size: 10px;
          color: #9ca3af;
          font-weight: 300;
        }

        /* Entrance */
        @keyframes v3Up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .v3-content > * { animation: v3Up 0.5s ease forwards; opacity:0; }
        .v3-content > *:nth-child(1) { animation-delay: 0.05s; }
        .v3-content > *:nth-child(2) { animation-delay: 0.14s; }
        .v3-content > *:nth-child(3) { animation-delay: 0.22s; }
        .v3-content > *:nth-child(4) { animation-delay: 0.30s; }
        .v3-content > *:nth-child(5) { animation-delay: 0.37s; }
        .v3-content > *:nth-child(6) { animation-delay: 0.43s; }
        .v3-visual { animation: v3Up 0.6s ease 0.22s forwards; opacity:0; }
      `}</style>

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

              <div>
                <div className="v3-counter">
                  <svg width="7" height="7" viewBox="0 0 8 8" fill="#22c55e">
                    <circle cx="4" cy="4" r="4" />
                  </svg>
                  <span><strong>{photoCount.toLocaleString('it-IT')}</strong> foto elaborate oggi</span>
                </div>
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
                  <img src="/before.png" alt="Prima" className="w-full h-full object-cover" />
                </div>
                <div
                  className="absolute inset-0 bg-white"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img src="/after.png" alt="Dopo" className="w-full h-full object-cover" />
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
    </>
  )
}
