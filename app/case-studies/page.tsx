'use client'

import Link from 'next/link'
import { Check, ArrowRight, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cases } from './_data'

export default function CaseStudiesPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {it ? 'Casi di Studio' : 'Case Studies'}
          </h1>
          <p className="text-gray-500 text-sm">
            {it
              ? 'Come i nostri utenti risparmiano ore ogni settimana con Centyr.'
              : 'How our users save hours every week with Centyr.'}
          </p>
        </div>

        <div className="space-y-8">
          {cases.map((c, i) => {
            const content = it ? c.it : c.en
            return (
              <Link key={i} href={`/case-studies/${c.slug}`} className="block bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-8 hover:border-purple-300 transition-colors group">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                    {it ? c.sector.it : c.sector.en}
                  </span>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    {it ? c.result.it : c.result.en}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">{content.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{content.excerpt}</p>
                <ul className="space-y-1 mb-3">
                  {content.metrics.map(m => (
                    <li key={m} className="flex items-center gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-green-500 shrink-0" /> {m}
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-purple-600 font-medium flex items-center gap-1">{it ? 'Leggi il caso' : 'Read case study'} <ArrowRight className="w-4 h-4" /></p>
              </Link>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">{it ? 'Prova gratis' : 'Try for free'}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {it ? '3 jobs gratuiti al mese. Nessuna carta di credito richiesta.' : '3 free jobs per month. No credit card required.'}
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
          >
            <span className="inline-flex items-center gap-1">{it ? 'Inizia gratuitamente' : 'Start for free'} <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/blog" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Blog</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1"><ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
