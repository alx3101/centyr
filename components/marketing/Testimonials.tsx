'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const rows = [
  {
    topic: { en: 'Time per SKU', it: 'Tempo per SKU' },
    before: { en: 'Hours in Photoshop or Lightroom', it: 'Ore in Photoshop o Lightroom' },
    after: { en: 'Seconds, fully automatic', it: 'Secondi, completamente automatico' },
  },
  {
    topic: { en: 'Marketplace compliance', it: 'Conformità marketplace' },
    before: { en: 'Manual checks, frequent rejections', it: 'Controlli manuali, rifiuti frequenti' },
    after: { en: 'Amazon, eBay, Etsy, Zalando ready out of the box', it: 'Pronto per Amazon, eBay, Etsy, Zalando' },
  },
  {
    topic: { en: 'Visual consistency', it: 'Coerenza visiva' },
    before: { en: 'Varies by photographer or editor', it: 'Dipende dal fotografo o dall\'editor' },
    after: { en: 'Uniform catalog, every time', it: 'Catalogo uniforme, ogni volta' },
  },
  {
    topic: { en: 'Cost', it: 'Costo' },
    before: { en: 'Freelancers, variable, hard to scale', it: 'Freelance, variabile, difficile da scalare' },
    after: { en: 'Fixed price, scales with your catalog', it: 'Prezzo fisso, scala col catalogo' },
  },
  {
    topic: { en: 'Setup', it: 'Setup' },
    before: { en: 'Software, presets, training', it: 'Software, preset, formazione' },
    after: { en: 'Upload and go, no learning curve', it: 'Carica e vai, zero curva di apprendimento' },
  },
]

export default function Testimonials() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: 'Onest, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#0f0a1e', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
            {it ? 'Il vecchio modo. Il nuovo modo.' : 'The old way. The new way.'}
          </h2>
          <p style={{ fontFamily: 'Onest, sans-serif', fontSize: '0.95rem', color: '#6b7280', fontWeight: 300, maxWidth: 420, margin: '0 auto', lineHeight: 1.7 }}>
            {it
              ? 'Il flusso di lavoro cambia. I risultati migliorano.'
              : 'The workflow changes. The results get better.'}
          </p>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #f3f4f6', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>

          {/* Column headers */}
          <div className="grid grid-cols-3 text-sm font-semibold" style={{ borderBottom: '1.5px solid #f3f4f6' }}>
            <div className="px-6 py-4 bg-gray-50 text-gray-400 uppercase tracking-wider text-xs" style={{ fontFamily: 'Onest, sans-serif' }}>
              {it ? 'Aspetto' : 'Aspect'}
            </div>
            <div className="px-6 py-4 bg-red-50 text-red-400 uppercase tracking-wider text-xs flex items-center gap-2" style={{ fontFamily: 'Onest, sans-serif' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" d="M15 9l-6 6M9 9l6 6"/></svg>
              {it ? 'Senza Centyr' : 'Without Centyr'}
            </div>
            <div className="px-6 py-4 uppercase tracking-wider text-xs flex items-center gap-2" style={{ fontFamily: 'Onest, sans-serif', background: '#faf5ff', color: '#7c3aed' }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5"/></svg>
              {it ? 'Con Centyr' : 'With Centyr'}
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-sm"
              style={{ borderBottom: i < rows.length - 1 ? '1px solid #f3f4f6' : 'none' }}
            >
              <div className="px-6 py-5 bg-gray-50 font-semibold text-gray-700" style={{ fontFamily: 'Onest, sans-serif', fontSize: 13 }}>
                {it ? row.topic.it : row.topic.en}
              </div>
              <div className="px-6 py-5 bg-red-50/40 text-gray-500 flex items-start gap-2" style={{ fontFamily: 'Onest, sans-serif', fontSize: 13, lineHeight: 1.5 }}>
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="#f87171" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/></svg>
                {it ? row.before.it : row.before.en}
              </div>
              <div className="px-6 py-5 flex items-start gap-2" style={{ fontFamily: 'Onest, sans-serif', fontSize: 13, lineHeight: 1.5, background: '#fdf8ff', color: '#374151' }}>
                <svg className="flex-shrink-0 mt-0.5" width="14" height="14" fill="none" stroke="#7c3aed" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                {it ? row.after.it : row.after.en}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/signup"
            className="inline-block gradient-purple-fuchsia text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
            style={{ fontFamily: 'Onest, sans-serif' }}
          >
            {it ? 'Prova gratis, nessuna carta' : 'Try free, no card required'}
          </Link>
          <p className="text-xs text-gray-400 mt-3" style={{ fontFamily: 'Onest, sans-serif' }}>
            {it ? '10 prodotti inclusi nel piano gratuito' : '10 products included in the free plan'}
          </p>
        </div>

      </div>
    </section>
  )
}
