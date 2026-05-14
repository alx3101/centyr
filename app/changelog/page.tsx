'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const releases = [
  {
    version: '2.3.0',
    date: { en: 'March 31, 2026', it: '31 marzo 2026' },
    type: 'major' as const,
    changes: {
      en: [
        { type: 'new', text: 'Full homepage redesign, Onest font, white/purple theme, before/after slider' },
        { type: 'new', text: 'Dashboard redesign, clean SaaS layout, white cards, professional sidebar with user info' },
        { type: 'new', text: 'Upload page redesign, cleaner wizard steps, improved dropzone' },
        { type: 'new', text: 'SEO: sitemap.xml, robots.txt, per-post metadata and JSON-LD structured data for blog' },
        { type: 'fix', text: 'Fixed hydration mismatch error on Hero component (inline style → globals.css)' },
        { type: 'fix', text: 'Fixed Cognito login flow, switched to USER_PASSWORD_AUTH to avoid SRP alias mismatch' },
        { type: 'improvement', text: 'Replaced all emoji in dashboard and upload UI with clean text labels' },
        { type: 'improvement', text: 'TrustedBy section now shows industry category marquee instead of fake brand names' },
      ],
      it: [
        { type: 'new', text: 'Redesign completo della homepage, font Onest, tema bianco/viola, slider before/after' },
        { type: 'new', text: 'Redesign dashboard, layout SaaS pulito, card bianche, sidebar professionale con info utente' },
        { type: 'new', text: 'Redesign pagina upload, wizard più pulito, dropzone migliorata' },
        { type: 'new', text: 'SEO: sitemap.xml, robots.txt, metadata per post e dati strutturati JSON-LD per il blog' },
        { type: 'fix', text: 'Corretto errore di hydration mismatch nel componente Hero (style inline → globals.css)' },
        { type: 'fix', text: 'Corretto flusso di login Cognito, passaggio a USER_PASSWORD_AUTH per evitare mismatch SRP' },
        { type: 'improvement', text: 'Sostituite tutte le emoji nella dashboard e upload con etichette testuali' },
        { type: 'improvement', text: 'Sezione TrustedBy ora mostra una marquee di categorie di settore invece di nomi di brand finti' },
      ],
    },
  },
  {
    version: '2.2.0',
    date: { en: 'February 2026', it: 'Febbraio 2026' },
    type: 'minor' as const,
    changes: {
      en: [
        { type: 'new', text: 'Billing dashboard with plan details and usage tracking' },
        { type: 'new', text: 'Subscription upgrade and downgrade via SubscriptionSchedule' },
        { type: 'new', text: 'Cookie banner and GDPR compliance pages' },
        { type: 'new', text: 'Account deletion and data export endpoints' },
        { type: 'fix', text: 'Fixed subscription plan mapping from Stripe Product ID' },
        { type: 'improvement', text: 'Stripe webhook now updates monthly_limit in DynamoDB on plan change' },
      ],
      it: [
        { type: 'new', text: 'Dashboard di fatturazione con dettagli piano e monitoraggio utilizzo' },
        { type: 'new', text: 'Upgrade e downgrade abbonamento tramite SubscriptionSchedule' },
        { type: 'new', text: 'Cookie banner e pagine di conformità GDPR' },
        { type: 'new', text: 'Endpoint per eliminazione account ed esportazione dati' },
        { type: 'fix', text: 'Corretto mapping del piano abbonamento dal Stripe Product ID' },
        { type: 'improvement', text: 'Il webhook Stripe aggiorna ora monthly_limit in DynamoDB al cambio piano' },
      ],
    },
  },
  {
    version: '2.1.0',
    date: { en: 'January 2026', it: 'Gennaio 2026' },
    type: 'minor' as const,
    changes: {
      en: [
        { type: 'new', text: 'Blog section with guides, case studies and tips' },
        { type: 'new', text: 'Batch processing up to 50 images per job' },
        { type: 'new', text: 'Job detail page with per-image status and download' },
        { type: 'new', text: 'IT/EN language switcher' },
        { type: 'improvement', text: 'Polling speed adapts based on active job status (5s active / 10s idle)' },
      ],
      it: [
        { type: 'new', text: 'Sezione blog con guide, casi studio e consigli' },
        { type: 'new', text: 'Elaborazione batch fino a 50 immagini per job' },
        { type: 'new', text: 'Pagina dettaglio job con stato per immagine e download' },
        { type: 'new', text: 'Selettore lingua IT/EN' },
        { type: 'improvement', text: 'Velocità polling si adatta allo stato del job (5s attivo / 10s idle)' },
      ],
    },
  },
  {
    version: '2.0.0',
    date: { en: 'December 2025', it: 'Dicembre 2025' },
    type: 'major' as const,
    changes: {
      en: [
        { type: 'new', text: 'Automatic background removal (BRIA RMBG model)' },
        { type: 'new', text: 'Custom background upload (image or solid color)' },
        { type: 'new', text: 'Premium subscription plans via Stripe' },
        { type: 'new', text: 'Output size selector (500px to 4000px)' },
        { type: 'new', text: 'Margin/padding control for subject framing' },
      ],
      it: [
        { type: 'new', text: 'Rimozione sfondo automatica (modello BRIA RMBG)' },
        { type: 'new', text: 'Caricamento sfondo personalizzato (immagine o colore solido)' },
        { type: 'new', text: 'Piani di abbonamento Premium tramite Stripe' },
        { type: 'new', text: 'Selettore dimensione output (da 500px a 4000px)' },
        { type: 'new', text: 'Controllo margine/padding per l\'inquadratura del soggetto' },
      ],
    },
  },
]

const tagConfig = {
  new: { label: { en: 'New', it: 'Novità' }, color: 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0]' },
  fix: { label: { en: 'Fix', it: 'Fix' }, color: 'bg-[#fef2f2] text-[#dc2626] border-[#fecaca]' },
  improvement: { label: { en: 'Improved', it: 'Migliorato' }, color: 'bg-[#faf5ff] text-[#7c3aed] border-[#e9d5ff]' },
}

const versionColor = {
  major: 'bg-[#7c3aed] text-white',
  minor: 'bg-[#f3f4f6] text-[#374151]',
}

export default function ChangelogPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#9ca3af] hover:text-[#111827] transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {it ? 'Torna alla home' : 'Back to home'}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7c3aed] mb-2">
            {it ? 'Aggiornamenti' : 'Updates'}
          </p>
          <h1
            className="text-4xl font-extrabold text-[#0f0a1e] mb-3"
            style={{ letterSpacing: '-0.03em' }}
          >
            Changelog
          </h1>
          <p className="text-[#6b7280] text-base">
            {it
              ? 'Tutte le novità, miglioramenti e correzioni di Centyr.'
              : 'Every new feature, improvement and fix shipped to Centyr.'}
          </p>
        </div>

        {/* Releases */}
        <div className="space-y-10">
          {releases.map((release) => (
            <div
              key={release.version}
              className="bg-white rounded-2xl border border-[#f0f0f0] overflow-hidden"
              style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
            >
              {/* Release header */}
              <div className="flex items-center justify-between px-7 py-5 border-b border-[#f0f0f0]">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${versionColor[release.type]}`}>
                    v{release.version}
                  </span>
                  <span className="text-sm text-[#9ca3af]">
                    {it ? release.date.it : release.date.en}
                  </span>
                </div>
              </div>

              {/* Changes list */}
              <ul className="divide-y divide-[#f9fafb]">
                {(it ? release.changes.it : release.changes.en).map((change, idx) => {
                  const tag = tagConfig[change.type as keyof typeof tagConfig]
                  return (
                    <li key={idx} className="flex items-start gap-4 px-7 py-4">
                      <span
                        className={`flex-shrink-0 mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded border ${tag.color}`}
                        style={{ letterSpacing: '0.04em' }}
                      >
                        {it ? tag.label.it : tag.label.en}
                      </span>
                      <span className="text-sm text-[#374151] leading-relaxed">{change.text}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[#9ca3af] mt-12">
          {it
            ? 'Vuoi suggerire una funzionalità? '
            : 'Want to suggest a feature? '}
          <Link href="/contact" className="text-[#7c3aed] hover:underline">
            {it ? 'Scrivici' : 'Get in touch'}
          </Link>
        </p>

      </div>
    </div>
  )
}
