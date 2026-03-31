'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { useTranslations } from '@/contexts/LanguageContext'

const AVATAR_COLORS = [
  { bg: '#f5f3ff', text: '#7c3aed', border: '#e9d5ff' },
  { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0' },
  { bg: '#fdf4ff', text: '#c026d3', border: '#f0abfc' },
  { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
]

const testimonials = [
  {
    initials: 'LB',
    name: 'Luca B.',
    role: 'E-commerce Manager',
    location: 'Milano',
    platform: 'Amazon IT',
    quote: {
      it: 'Avevamo 400 SKU da caricare su Amazon. Con Photoshop ci volevano 2 settimane. Con Centyr abbiamo finito in un pomeriggio — tutte passate al primo controllo qualità senza modifiche.',
      en: 'We had 400 SKUs to upload to Amazon. With Photoshop it took 2 weeks. With Centyr we finished in an afternoon — all passed quality check first time.',
    },
    metric: { value: '400 SKU', label: { it: 'in 1 pomeriggio', en: 'in 1 afternoon' } },
  },
  {
    initials: 'SR',
    name: 'Sara R.',
    role: 'Founder',
    location: 'Torino',
    platform: 'Shopify',
    quote: {
      it: 'Il mio fotografo mi mandava foto grezze e io passavo ore in Lightroom. Adesso carico tutto su Centyr e in 10 minuti è pronto. Il risparmio di tempo è assurdo.',
      en: 'My photographer sent raw shots and I spent hours in Lightroom. Now I upload to Centyr and in 10 minutes it\'s ready. The time saving is insane.',
    },
    metric: { value: '−6 ore', label: { it: 'a settimana di editing', en: 'per week in editing' } },
  },
  {
    initials: 'MF',
    name: 'Marco F.',
    role: 'Operations Lead',
    location: 'Roma',
    platform: 'WooCommerce',
    quote: {
      it: 'Gestiamo 3 brand diversi. La coerenza visiva era un problema enorme. Centyr ha standardizzato tutto e il nostro bounce rate è calato del 18%.',
      en: 'We manage 3 different brands. Visual consistency was a huge issue. Centyr standardized everything and our bounce rate dropped 18%.',
    },
    metric: { value: '−18%', label: { it: 'bounce rate', en: 'bounce rate' } },
  },
  {
    initials: 'AG',
    name: 'Alessia G.',
    role: 'Photo Coordinator',
    location: 'Firenze',
    platform: 'Zalando / Farfetch',
    quote: {
      it: 'I marketplace luxury rifiutavano il 30% delle nostre immagini. Da quando usiamo Centyr siamo sotto il 2%. È diventato parte del nostro processo standard.',
      en: 'Luxury marketplaces were rejecting 30% of our images. Since using Centyr we\'re under 2%. It\'s now part of our standard workflow.',
    },
    metric: { value: '2%', label: { it: 'rifiuti (era 30%)', en: 'rejection (was 30%)' } },
  },
]

const stats = [
  { value: '48.000+', label: { it: 'foto elaborate oggi', en: 'photos processed today' } },
  { value: '< 20 sec', label: { it: 'tempo medio per immagine', en: 'avg. per image' } },
  { value: '99.4%', label: { it: 'tasso di successo', en: 'success rate' } },
  { value: '4.8 / 5', label: { it: 'valutazione media', en: 'avg. rating' } },
]

export default function Testimonials() {
  const t = useTranslations()
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full mb-5">
            <svg width="7" height="7" viewBox="0 0 8 8" fill="#22c55e"><circle cx="4" cy="4" r="4"/></svg>
            <span className="text-green-700 font-semibold text-xs tracking-wide uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
              {t.marketing.testimonials.badge}
            </span>
          </div>
          <h2 style={{ fontFamily: 'Onest, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#0f0a1e', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 10 }}>
            {t.marketing.testimonials.title}
          </h2>
          <p style={{ fontFamily: 'Onest, sans-serif', fontSize: '0.95rem', color: '#6b7280', fontWeight: 300, maxWidth: 380, margin: '0 auto', lineHeight: 1.65 }}>
            {t.marketing.testimonials.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {testimonials.map((item, idx) => {
            const color = AVATAR_COLORS[idx % AVATAR_COLORS.length]
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 transition-all duration-200 hover:-translate-y-0.5"
                style={{ border: '1.5px solid #f3f4f6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#e9d5ff')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#f3f4f6')}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="#f59e0b">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span style={{ background: '#faf5ff', border: '1px solid #e9d5ff', color: '#7c3aed', fontFamily: 'Onest, sans-serif', fontSize: 10.5, fontWeight: 500, padding: '3px 9px', borderRadius: 5, letterSpacing: '0.03em' }}>
                    {item.platform}
                  </span>
                </div>

                {/* Quote */}
                <p style={{ fontFamily: 'Onest, sans-serif', fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.72, fontWeight: 300, marginBottom: 16 }}>
                  "{it ? item.quote.it : item.quote.en}"
                </p>

                {/* Metric */}
                <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 7, background: '#f0fdf4', border: '1px solid #bbf7d0', padding: '5px 11px', borderRadius: 8, marginBottom: 18 }}>
                  <span style={{ fontFamily: 'Onest, sans-serif', fontSize: '1rem', fontWeight: 700, color: '#16a34a' }}>{item.metric.value}</span>
                  <span style={{ fontFamily: 'Onest, sans-serif', fontSize: 11, color: '#4ade80', fontWeight: 400 }}>{it ? item.metric.label.it : item.metric.label.en}</span>
                </div>

                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 11, paddingTop: 14, borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: color.bg, border: `1.5px solid ${color.border}`, color: color.text, fontFamily: 'Onest, sans-serif', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.initials}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 13.5, fontWeight: 700, color: '#111827' }}>{item.name}</div>
                    <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 11.5, color: '#9ca3af', fontWeight: 300 }}>{item.role} · {item.location}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-100 rounded-2xl overflow-hidden" style={{ border: '1.5px solid #f3f4f6' }}>
          {stats.map((s, i) => (
            <div key={i} className="bg-white px-6 py-7 text-center">
              <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 800, color: '#0f0a1e', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 5 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 12, color: '#9ca3af', fontWeight: 300 }}>
                {it ? s.label.it : s.label.en}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
