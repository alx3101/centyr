'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const roadmapData = {
  done: {
    en: 'Shipped',
    it: 'Rilasciato',
    color: 'green',
    items: [
      {
        en: 'AI product centering & alignment',
        it: 'Centraggio e allineamento AI del prodotto',
      },
      {
        en: 'Background removal (AI-powered)',
        it: 'Rimozione sfondo (AI)',
      },
      {
        en: 'Batch upload up to 50 images',
        it: 'Caricamento batch fino a 50 immagini',
      },
      {
        en: 'Custom output size (px / ratio)',
        it: 'Dimensione output personalizzata (px / rapporto)',
      },
      {
        en: 'Custom background color or image',
        it: 'Colore o immagine di sfondo personalizzata',
      },
      {
        en: 'Margin / padding control',
        it: 'Controllo margini / padding',
      },
      {
        en: 'Download all outputs as ZIP',
        it: 'Download di tutti gli output come ZIP',
      },
      {
        en: 'REST API (v1)',
        it: 'REST API (v1)',
      },
      {
        en: 'Free plan (3 jobs/month)',
        it: 'Piano gratuito (3 jobs/mese)',
      },
      {
        en: 'Premium subscription with monthly quota',
        it: 'Abbonamento Premium con quota mensile',
      },
    ],
  },
  soon: {
    en: 'Coming soon',
    it: 'In arrivo',
    color: 'purple',
    items: [
      {
        en: 'Shopify & WooCommerce direct integration',
        it: 'Integrazione diretta Shopify & WooCommerce',
      },
      {
        en: 'Preset profiles (Amazon, eBay, Zalando…)',
        it: 'Profili preimpostati (Amazon, eBay, Zalando…)',
      },
      {
        en: 'Multi-view processing (front / side / detail)',
        it: 'Elaborazione multi-vista (fronte / lato / dettaglio)',
      },
      {
        en: 'Bulk rename & metadata export',
        it: 'Rinomina bulk ed export metadati',
      },
      {
        en: 'Team accounts & shared workspaces',
        it: 'Account team e spazi di lavoro condivisi',
      },
      {
        en: 'Webhook notifications on job completion',
        it: 'Notifiche webhook al completamento del job',
      },
    ],
  },
  later: {
    en: 'Later',
    it: 'In futuro',
    color: 'gray',
    items: [
      {
        en: 'Shadow & reflection generation',
        it: 'Generazione ombre e riflessi',
      },
      {
        en: 'AI lifestyle background generation',
        it: 'Generazione sfondo lifestyle con AI',
      },
      {
        en: 'Video product clips (auto-generated)',
        it: 'Video prodotto (generati automaticamente)',
      },
      {
        en: 'Enterprise SSO & audit logs',
        it: 'SSO Enterprise e audit log',
      },
      {
        en: 'On-premise / private cloud deployment',
        it: 'Deployment on-premise / cloud privato',
      },
    ],
  },
}

const badgeColors: Record<string, string> = {
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  gray: 'bg-gray-100 text-gray-600',
}

const dotColors: Record<string, string> = {
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  gray: 'bg-gray-400',
}

export default function RoadmapPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Roadmap</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {it
              ? 'Cosa abbiamo costruito e cosa stiamo costruendo. Aggiornata regolarmente.'
              : 'What we\'ve built and what we\'re building. Updated regularly.'}
          </p>
        </div>

        <div className="space-y-8">
          {(['done', 'soon', 'later'] as const).map((phase) => {
            const data = roadmapData[phase]
            const label = it ? data.it : data.en
            return (
              <div key={phase} className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${badgeColors[data.color]}`}>
                    {label}
                  </span>
                </div>
                <ul className="space-y-3">
                  {data.items.map((item) => (
                    <li key={item.en} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColors[data.color]}`} />
                      {it ? item.it : item.en}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Feature request */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <p className="text-gray-700 font-medium mb-2">
            {it ? 'Hai un\'idea o una funzionalità che ti manca?' : 'Have a feature idea or request?'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            {it
              ? 'Scrivici — le richieste degli utenti guidano direttamente la priorità della roadmap.'
              : 'Write to us — user requests directly guide roadmap priority.'}
          </p>
          <a
            href="mailto:support@centyr.tech?subject=Feature request"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
          >
            <span className="inline-flex items-center gap-1">{it ? 'Invia un\'idea' : 'Send an idea'} <ArrowRight className="w-4 h-4" /></span>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/status" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Status</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1"><ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
