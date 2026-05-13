'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Testimonials() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-1.5 rounded-full mb-6">
          <svg width="7" height="7" viewBox="0 0 8 8" fill="#22c55e"><circle cx="4" cy="4" r="4"/></svg>
          <span className="text-green-700 font-semibold text-xs tracking-wide uppercase" style={{ fontFamily: 'Onest, sans-serif' }}>
            {it ? 'Early access' : 'Early access'}
          </span>
        </div>

        <h2 style={{ fontFamily: 'Onest, sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', color: '#0f0a1e', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
          {it ? 'Sii tra i primi.' : 'Be among the first.'}
        </h2>

        <p style={{ fontFamily: 'Onest, sans-serif', fontSize: '1rem', color: '#6b7280', fontWeight: 300, maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
          {it
            ? 'Centyr è appena lanciato. Stiamo crescendo con i primi clienti reali — se provi il prodotto e hai feedback, ci fa piacere sentirlo.'
            : 'Centyr just launched. We\'re growing with our first real customers — if you try the product and have feedback, we\'d love to hear it.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: '⚡',
              title: it ? 'Risultati in secondi' : 'Results in seconds',
              desc: it ? 'Nessuna attesa. Carica, elabora, scarica.' : 'No waiting. Upload, process, download.',
            },
            {
              icon: '🎯',
              title: it ? 'Standard marketplace' : 'Marketplace standards',
              desc: it ? 'Immagini pronte per Amazon, Shopify, Zalando.' : 'Images ready for Amazon, Shopify, Zalando.',
            },
            {
              icon: '🔒',
              title: it ? 'Nessun abbonamento obbligatorio' : 'No forced subscription',
              desc: it ? '3 job gratuiti. Nessuna carta richiesta.' : '3 free jobs. No card required.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-left" style={{ border: '1.5px solid #f3f4f6', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <div className="text-2xl mb-3">{item.icon}</div>
              <div style={{ fontFamily: 'Onest, sans-serif', fontWeight: 700, fontSize: 14, color: '#111827', marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontFamily: 'Onest, sans-serif', fontSize: 13, color: '#9ca3af', fontWeight: 300, lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <Link
          href="/signup"
          className="inline-block gradient-purple-fuchsia text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          style={{ fontFamily: 'Onest, sans-serif' }}
        >
          {it ? 'Inizia gratis — 3 job inclusi' : 'Start free — 3 jobs included'}
        </Link>

      </div>
    </section>
  )
}
