'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const openRoles = [
  {
    title: { en: 'Senior ML Engineer', it: 'Senior ML Engineer' },
    type: { en: 'Full-time · Remote (Italy)', it: 'Full-time · Remoto (Italia)' },
    desc: {
      en: 'Own the AI pipeline: improve centering accuracy, background removal quality, and processing speed. Experience with computer vision (YOLO, SAM, or similar) required.',
      it: 'Guida la pipeline AI: migliora l\'accuratezza del centraggio, la qualità della rimozione dello sfondo e la velocità di elaborazione. Richiesta esperienza in computer vision (YOLO, SAM o simili).',
    },
  },
  {
    title: { en: 'Full-Stack Engineer (Next.js + Python)', it: 'Full-Stack Engineer (Next.js + Python)' },
    type: { en: 'Full-time · Remote (EU)', it: 'Full-time · Remoto (EU)' },
    desc: {
      en: 'Build and scale the Centyr platform: Next.js frontend, Python/FastAPI backend, AWS infrastructure. You\'ll touch every layer of the stack.',
      it: 'Costruisci e scala la piattaforma Centyr: frontend Next.js, backend Python/FastAPI, infrastruttura AWS. Toccherai ogni layer dello stack.',
    },
  },
]

export default function CareersPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {it ? 'Lavora con Noi' : 'Careers'}
          </h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {it
              ? 'Stiamo costruendo il futuro della fotografia prodotto AI. Unisciti a noi.'
              : 'We\'re building the future of AI product photography. Join us.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-10 text-gray-700">

          {/* Why */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{it ? 'Perché Centyr' : 'Why Centyr'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {(it ? [
                ['🚀', 'Prodotto reale, utenti reali, impatto immediato'],
                ['🌍', 'Team remoto, infrastruttura EU'],
                ['⚡', 'Stack moderno: Next.js, Python, AWS, AI/ML'],
                ['📈', 'Equity disponibile per early hires'],
                ['🔒', 'Focus su privacy e qualità del codice'],
                ['🧠', 'Problemi tecnici interessanti (CV, scaling, UX)'],
              ] : [
                ['🚀', 'Real product, real users, immediate impact'],
                ['🌍', 'Remote team, EU infrastructure'],
                ['⚡', 'Modern stack: Next.js, Python, AWS, AI/ML'],
                ['📈', 'Equity available for early hires'],
                ['🔒', 'Focus on privacy and code quality'],
                ['🧠', 'Interesting technical problems (CV, scaling, UX)'],
              ]).map(([icon, text]) => (
                <div key={text} className="flex items-start gap-2 bg-purple-50 rounded-xl p-3 border border-purple-100">
                  <span>{icon}</span>
                  <span className="text-gray-700">{text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Open roles */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{it ? 'Posizioni Aperte' : 'Open Positions'}</h2>
            <div className="space-y-4">
              {openRoles.map((role, i) => (
                <div key={i} className="border-2 border-purple-100 rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <p className="font-bold text-gray-900">{it ? role.title.it : role.title.en}</p>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">
                      {it ? role.type.it : role.type.en}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{it ? role.desc.it : role.desc.en}</p>
                  <a
                    href={`mailto:support@centyr.tech?subject=${encodeURIComponent(it ? role.title.it : role.title.en)}`}
                    className="mt-3 inline-block text-sm text-purple-600 font-medium hover:underline"
                  >
                    {it ? 'Candidati →' : 'Apply →'}
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Spontaneous */}
          <section className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 border border-purple-100 text-center">
            <h3 className="font-bold text-gray-900 mb-2">
              {it ? 'Candidatura spontanea' : 'Spontaneous application'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {it
                ? 'Non vedi un ruolo adatto? Scrivici lo stesso — siamo sempre interessati a persone con talento.'
                : 'Don\'t see a fitting role? Write to us anyway — we\'re always interested in talented people.'}
            </p>
            <a
              href="mailto:support@centyr.tech?subject=Candidatura spontanea"
              className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
            >
              {it ? 'Scrivici' : 'Write to us'}
            </a>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/about" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Chi Siamo' : 'About'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">{it ? '← Torna alla Home' : '← Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
