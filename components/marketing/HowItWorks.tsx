'use client'

import Link from 'next/link'
import { useTranslations } from '@/contexts/LanguageContext'

const UploadIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
)

const ProcessIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const DownloadIcon = () => (
  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const ArrowIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M13 7l5 5m0 0l-5 5m5-5H6" />
  </svg>
)

export default function HowItWorks() {
  const t = useTranslations()

  const steps = [
    {
      number: '01',
      icon: <UploadIcon />,
      title: t.marketing.howItWorks.step1Title,
      description: t.marketing.howItWorks.step1Desc,
      sub: null,
    },
    {
      number: '02',
      icon: <ProcessIcon />,
      title: t.marketing.howItWorks.step2Title,
      description: t.marketing.howItWorks.step2Desc,
      sub: t.marketing.howItWorks.step2Sub,
    },
    {
      number: '03',
      icon: <DownloadIcon />,
      title: t.marketing.howItWorks.step3Title,
      description: t.marketing.howItWorks.step3Desc,
      sub: null,
    },
  ]

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{ backgroundColor: '#faf5ff', color: '#7c3aed' }}
          >
            {t.marketing.howItWorks.badge}
          </span>
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: '#0f0a1e', letterSpacing: '-0.03em' }}
          >
            {t.marketing.howItWorks.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6b7280', lineHeight: '1.7' }}
          >
            {t.marketing.howItWorks.subtitle}
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col">
              {/* Card */}
              <div
                className="relative bg-white rounded-2xl p-8 flex flex-col h-full transition-all duration-200 group"
                style={{
                  border: '1.5px solid #f3f4f6',
                  borderRadius: '16px',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#e9d5ff'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(124,58,237,0.08)'
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#f3f4f6'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
                }}
              >
                {/* Big background number decoration */}
                <span
                  className="absolute top-4 right-5 text-8xl font-black select-none pointer-events-none leading-none"
                  style={{ color: '#f9f5ff', zIndex: 0 }}
                >
                  {step.number}
                </span>

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ backgroundColor: '#faf5ff', color: '#7c3aed' }}
                  >
                    {step.icon}
                  </div>

                  {/* Step label */}
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-2"
                    style={{ color: '#7c3aed' }}
                  >
                    Step {step.number}
                  </p>

                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: '#0f0a1e', letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: '#6b7280', lineHeight: '1.7' }}
                  >
                    {step.description}
                  </p>
                  {step.sub && (
                    <p
                      className="text-xs mt-2 italic"
                      style={{ color: '#9ca3af' }}
                    >
                      {step.sub}
                    </p>
                  )}
                </div>
              </div>

              {/* Arrow connector (between cards, not after last) */}
              {idx < steps.length - 1 && (
                <div
                  className="hidden md:flex items-center justify-center absolute top-1/2 -right-5 transform -translate-y-1/2 z-20"
                  style={{ color: '#d8b4fe' }}
                >
                  <ArrowIcon />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl px-8 py-6"
          style={{ backgroundColor: '#faf5ff', border: '1.5px solid #e9d5ff' }}
        >
          <p
            className="text-base font-semibold"
            style={{ color: '#0f0a1e' }}
          >
            {t.marketing.howItWorks.bottomText}
          </p>
          <Link
            href="/upload"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 flex-shrink-0"
            style={{ backgroundColor: '#7c3aed' }}
          >
            <ProcessIcon />
            {t.marketing.howItWorks.ctaButton}
          </Link>
        </div>
      </div>
    </section>
  )
}
