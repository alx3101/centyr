'use client'

import { useTranslations } from '@/contexts/LanguageContext'

const AiIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const BulkIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const StorageIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
)

const IntegrationIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SpeedIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  large?: boolean
  comingSoon?: boolean
}

function FeatureCard({ icon, title, description, large = false, comingSoon = false }: FeatureCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-8 flex flex-col transition-all duration-200 cursor-default relative overflow-hidden"
      style={{
        border: '1.5px solid #f3f4f6',
        borderRadius: '16px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = '#e9d5ff'
        el.style.boxShadow = '0 4px 20px rgba(124,58,237,0.08)'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = '#f3f4f6'
        el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
      }}
    >
      {comingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full shadow-sm" style={{ backgroundColor: '#0f0a1e', color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Coming soon
          </span>
        </div>
      )}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 flex-shrink-0"
        style={{ backgroundColor: '#faf5ff', color: '#7c3aed' }}
      >
        {icon}
      </div>
      <h3
        className={`font-bold mb-2 ${large ? 'text-2xl' : 'text-xl'}`}
        style={{ color: '#0f0a1e', letterSpacing: '-0.02em' }}
      >
        {title}
      </h3>
      <p
        className={`${large ? 'text-base' : 'text-sm'}`}
        style={{ color: '#6b7280', lineHeight: '1.7' }}
      >
        {description}
      </p>
      {large && (
        <div className="mt-6 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#faf5ff', color: '#7c3aed' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            No skills required
          </span>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: '#f0fdf4', color: '#16a34a' }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Works in seconds
          </span>
        </div>
      )}
    </div>
  )
}

export default function Features() {
  const t = useTranslations()

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            style={{ color: '#0f0a1e', letterSpacing: '-0.03em' }}
          >
            {t.marketing.features.title}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: '#6b7280', lineHeight: '1.7' }}
          >
            {t.marketing.features.subtitle}
          </p>
        </div>

        {/* Feature 1 — full width hero card */}
        <div className="mb-6">
          <FeatureCard
            icon={<AiIcon />}
            title={t.marketing.features.f1Title}
            description={t.marketing.features.f1Desc}
            large
          />
        </div>

        {/* Features 2, 3, 4 — three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <FeatureCard
            icon={<BulkIcon />}
            title={t.marketing.features.f2Title}
            description={t.marketing.features.f2Desc}
          />
          <FeatureCard
            icon={<StorageIcon />}
            title={t.marketing.features.f3Title}
            description={t.marketing.features.f3Desc}
          />
          <FeatureCard
            icon={<IntegrationIcon />}
            title={t.marketing.features.f4Title}
            description={t.marketing.features.f4Desc}
            comingSoon
          />
        </div>

        {/* Two extra mini stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            className="rounded-2xl px-8 py-6 flex items-center gap-5 transition-all duration-200"
            style={{
              border: '1.5px solid #f3f4f6',
              borderRadius: '16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = '#e9d5ff'
              el.style.boxShadow = '0 4px 20px rgba(124,58,237,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = '#f3f4f6'
              el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#faf5ff', color: '#7c3aed' }}
            >
              <SpeedIcon />
            </div>
            <div>
              <p
                className="text-2xl font-extrabold"
                style={{ color: '#0f0a1e', letterSpacing: '-0.02em' }}
              >
                &lt;10s
              </p>
              <p className="text-sm font-medium" style={{ color: '#6b7280' }}>
                Average processing time per job
              </p>
            </div>
          </div>

          <div
            className="rounded-2xl px-8 py-6 flex items-center gap-5 transition-all duration-200"
            style={{
              border: '1.5px solid #f3f4f6',
              borderRadius: '16px',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = '#e9d5ff'
              el.style.boxShadow = '0 4px 20px rgba(124,58,237,0.08)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLDivElement
              el.style.borderColor = '#f3f4f6'
              el.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)'
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: '#faf5ff', color: '#7c3aed' }}
            >
              <ShieldIcon />
            </div>
            <div>
              <p
                className="text-2xl font-extrabold"
                style={{ color: '#0f0a1e', letterSpacing: '-0.02em' }}
              >
                99.9%
              </p>
              <p className="text-sm font-medium" style={{ color: '#6b7280' }}>
                Uptime SLA, always available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
