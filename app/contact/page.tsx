'use client'

import Link from 'next/link'
import { Mail, ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const CONTACT_EMAIL = 'hello@centyr.tech'

export default function ContactPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{it ? 'Contatti' : 'Contact'}</h1>
          <p className="text-gray-500 text-sm">
            {it ? 'Siamo qui per aiutarti.' : 'We\'re here to help.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            {it ? 'Scrivici' : 'Get in touch'}
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {it
              ? 'Per supporto, domande su piani, partnership o qualsiasi altra richiesta.'
              : 'For support, plan questions, partnerships, or anything else.'}
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-block gradient-purple-fuchsia text-white font-semibold px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-xs text-gray-400 mt-4">
            {it ? 'Risposta entro 24–48 ore' : 'We reply within 24–48 hours'}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/help" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Centro Assistenza' : 'Help Center'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  )
}
