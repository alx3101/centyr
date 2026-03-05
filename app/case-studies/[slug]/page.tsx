'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { cases } from '../_data'

export default function CaseStudyPage() {
  const params = useParams()
  const slug = params?.slug as string
  const { language } = useLanguage()
  const it = language === 'it'

  const c = cases.find(x => x.slug === slug)
  if (!c) notFound()

  const content = it ? c.it : c.en

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link href="/case-studies" className="text-sm text-purple-600 hover:text-fuchsia-600 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-1" />{it ? 'Torna ai Casi di Studio' : 'Back to Case Studies'}
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
            {it ? c.sector.it : c.sector.en}
          </span>
          <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
            {it ? c.result.it : c.result.en}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">{content.title}</h1>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
          {content.body.map((paragraph, i) => (
            <div key={i} className="text-gray-700 leading-relaxed text-[15px]">
              {paragraph.split('\n').map((line, j) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={j} className="font-bold text-gray-900 mt-4 first:mt-0">{line.slice(2, -2)}</p>
                }
                if (line.startsWith('**')) {
                  const match = line.match(/^\*\*(.+?)\*\*(.*)/)
                  if (match) return <p key={j}><strong>{match[1]}</strong>{match[2]}</p>
                }
                if (line.startsWith('- ')) {
                  return <p key={j} className="ml-4">• {line.slice(2)}</p>
                }
                return line ? <p key={j}>{line}</p> : null
              })}
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm border-2 border-green-100 rounded-2xl shadow-xl p-6">
          <h3 className="font-bold text-gray-900 mb-3">{it ? 'Risultati chiave' : 'Key results'}</h3>
          <ul className="space-y-2">
            {content.metrics.map(m => (
              <li key={m} className="flex items-center gap-2 text-sm text-gray-700">
                <Check className="w-4 h-4 text-green-500 font-bold shrink-0" /> {m}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-6 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <p className="font-bold text-gray-900 mb-2">{it ? 'Ottieni risultati simili' : 'Get similar results'}</p>
          <p className="text-sm text-gray-500 mb-4">
            {it ? '3 jobs gratuiti al mese. Nessuna carta di credito.' : '3 free jobs per month. No credit card required.'}
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
          >
            <span className="inline-flex items-center gap-1">{it ? 'Inizia gratuitamente' : 'Start for free'} <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/case-studies" className="text-purple-600 hover:text-fuchsia-600 font-semibold text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-1" />{it ? 'Tutti i casi di studio' : 'All case studies'}
          </Link>
        </div>
      </div>
    </div>
  )
}
