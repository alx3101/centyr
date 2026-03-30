'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MidCTA() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl px-8 py-6"
          style={{
            backgroundColor: '#faf5ff',
            border: '1.5px solid #e9d5ff',
            borderRadius: '16px',
          }}
        >
          {/* Text */}
          <div className="text-center sm:text-left">
            <p
              className="text-lg font-bold mb-0.5"
              style={{ color: '#0f0a1e', letterSpacing: '-0.01em' }}
            >
              {it ? 'Prova gratis — nessuna carta di credito' : 'Try for free — no credit card required'}
            </p>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              {it
                ? '3 job gratuiti al mese. Inizia in 60 secondi.'
                : '3 free jobs/month. Set up in 60 seconds.'}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-105 flex-shrink-0"
            style={{ backgroundColor: '#7c3aed' }}
          >
            {it ? 'Inizia gratuitamente' : 'Start for free'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
