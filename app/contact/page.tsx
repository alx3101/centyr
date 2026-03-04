'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{it ? 'Contatti' : 'Contact'}</h1>
          <p className="text-gray-500 text-sm">
            {it ? 'Siamo qui per aiutarti.' : 'We\'re here to help.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-8 text-gray-700">

          {/* Channels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <div className="text-2xl mb-2">💬</div>
              <h3 className="font-bold text-gray-900 mb-1">{it ? 'Supporto Tecnico' : 'Technical Support'}</h3>
              <p className="text-xs text-gray-500 mb-3">
                {it ? 'Problemi con l\'account, jobs, elaborazione immagini.' : 'Issues with account, jobs, image processing.'}
              </p>
              <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline text-sm font-medium">
                support@centyr.tech
              </a>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <div className="text-2xl mb-2">🔒</div>
              <h3 className="font-bold text-gray-900 mb-1">{it ? 'Privacy & GDPR' : 'Privacy & GDPR'}</h3>
              <p className="text-xs text-gray-500 mb-3">
                {it ? 'Diritti degli interessati, richieste di cancellazione dati.' : 'Data subject rights, deletion requests.'}
              </p>
              <a href="mailto:privacy@centyr.tech" className="text-purple-600 hover:underline text-sm font-medium">
                privacy@centyr.tech
              </a>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <div className="text-2xl mb-2">🛡️</div>
              <h3 className="font-bold text-gray-900 mb-1">{it ? 'Sicurezza' : 'Security'}</h3>
              <p className="text-xs text-gray-500 mb-3">
                {it ? 'Segnalazione vulnerabilità, responsible disclosure.' : 'Vulnerability reports, responsible disclosure.'}
              </p>
              <a href="mailto:security@centyr.tech" className="text-purple-600 hover:underline text-sm font-medium">
                security@centyr.tech
              </a>
            </div>

            <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
              <div className="text-2xl mb-2">🏢</div>
              <h3 className="font-bold text-gray-900 mb-1">{it ? 'Enterprise & Partner' : 'Enterprise & Partners'}</h3>
              <p className="text-xs text-gray-500 mb-3">
                {it ? 'Piani custom, integrazioni API, partnership.' : 'Custom plans, API integrations, partnerships.'}
              </p>
              <a href="mailto:enterprise@centyr.io" className="text-purple-600 hover:underline text-sm font-medium">
                enterprise@centyr.io
              </a>
            </div>
          </div>

          {/* Response times */}
          <div className="rounded-xl border border-gray-200 overflow-hidden text-sm">
            <div className="bg-gray-50 px-4 py-3 font-semibold text-gray-700">
              {it ? 'Tempi di risposta' : 'Response times'}
            </div>
            <div className="divide-y divide-gray-100">
              {(it ? [
                ['Supporto tecnico (piani a pagamento)', '< 24 ore'],
                ['Supporto tecnico (piano gratuito)', '< 72 ore'],
                ['Privacy & GDPR', '< 30 giorni (come da GDPR Art. 12)'],
                ['Segnalazioni di sicurezza', '< 48 ore'],
                ['Enterprise & Partnership', '< 2 giorni lavorativi'],
              ] : [
                ['Technical support (paid plans)', '< 24 hours'],
                ['Technical support (free plan)', '< 72 hours'],
                ['Privacy & GDPR', '< 30 days (per GDPR Art. 12)'],
                ['Security reports', '< 48 hours'],
                ['Enterprise & Partnerships', '< 2 business days'],
              ]).map(([channel, time]) => (
                <div key={channel} className="flex justify-between px-4 py-3">
                  <span className="text-gray-600">{channel}</span>
                  <span className="font-medium text-gray-900 shrink-0 ml-4">{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Help center nudge */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            💡 {it
              ? 'Prima di scrivere, controlla il nostro '
              : 'Before reaching out, check our '}
            <Link href="/help" className="underline font-semibold">
              {it ? 'Centro Assistenza' : 'Help Center'}
            </Link>
            {it ? ' — molte domande comuni trovano risposta immediata.' : ' — many common questions are answered there instantly.'}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/help" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Centro Assistenza' : 'Help Center'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">{it ? '← Torna alla Home' : '← Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
