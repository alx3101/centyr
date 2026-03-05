'use client'

import Link from 'next/link'
import { CheckCircle, XCircle, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function PressPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Press Kit</h1>
          <p className="text-gray-500 text-sm">
            {it
              ? 'Risorse per giornalisti, blogger e content creator.'
              : 'Resources for journalists, bloggers, and content creators.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-10 text-gray-700">

          {/* About */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{it ? 'Chi è Centyr' : 'About Centyr'}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {it
                ? 'Centyr è una piattaforma AI-powered per l\'elaborazione automatica di foto prodotto e-commerce. La pipeline identifica il soggetto, lo centra con precisione pixel-perfect, rimuove lo sfondo e genera output pronti per qualsiasi marketplace — in secondi, non ore. Fondata nel 2025, Centyr opera su infrastruttura AWS nella regione EU ed è pienamente conforme al GDPR.'
                : 'Centyr is an AI-powered platform for automatic e-commerce product photo processing. The pipeline identifies the subject, centers it with pixel-perfect precision, removes the background, and generates marketplace-ready outputs — in seconds, not hours. Founded in 2025, Centyr operates on AWS infrastructure in the EU region and is fully GDPR compliant.'}
            </p>
          </section>

          {/* Key facts */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{it ? 'Dati Chiave' : 'Key Facts'}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {(it ? [
                { value: '2025', label: 'Anno di fondazione' },
                { value: 'EU', label: 'Infrastruttura' },
                { value: '< 60s', label: 'Per immagine (Premium)' },
                { value: 'GDPR', label: 'Compliance' },
              ] : [
                { value: '2025', label: 'Founded' },
                { value: 'EU', label: 'Infrastructure' },
                { value: '< 60s', label: 'Per image (Premium)' },
                { value: 'GDPR', label: 'Compliance' },
              ]).map(({ value, label }) => (
                <div key={label} className="bg-purple-50 rounded-xl p-4 text-center border border-purple-100">
                  <div className="text-2xl font-bold text-purple-700">{value}</div>
                  <div className="text-xs text-gray-500 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Brand assets */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{it ? 'Asset del Brand' : 'Brand Assets'}</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">{it ? 'Logo Centyr (SVG + PNG)' : 'Centyr Logo (SVG + PNG)'}</p>
                  <p className="text-xs text-gray-400">{it ? 'Versioni chiaro e scuro' : 'Light and dark versions'}</p>
                </div>
                <a href="mailto:support@centyr.tech?subject=Press Kit - Logo" className="text-purple-600 hover:underline text-xs font-medium">
                  <span className="inline-flex items-center gap-1">{it ? 'Richiedi' : 'Request'} <ArrowRight className="w-3 h-3" /></span>
                </a>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <p className="font-medium text-gray-900">{it ? 'Screenshot prodotto' : 'Product screenshots'}</p>
                  <p className="text-xs text-gray-400">{it ? 'Dashboard, upload, risultati' : 'Dashboard, upload, results'}</p>
                </div>
                <a href="mailto:support@centyr.tech?subject=Press Kit - Screenshots" className="text-purple-600 hover:underline text-xs font-medium">
                  <span className="inline-flex items-center gap-1">{it ? 'Richiedi' : 'Request'} <ArrowRight className="w-3 h-3" /></span>
                </a>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              {it
                ? 'Per accedere agli asset del brand scrivi a '
                : 'To access brand assets write to '}
              <a href="mailto:support@centyr.tech" className="text-purple-600 hover:underline">support@centyr.tech</a>
              {it ? ' con oggetto "Press Kit".' : ' with subject "Press Kit".'}
            </p>
          </section>

          {/* Brand guidelines */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3">{it ? 'Linee Guida del Brand' : 'Brand Guidelines'}</h2>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span>{it ? '"Centyr" — maiuscola solo la prima lettera.' : '"Centyr" — only capitalize the first letter.'}</span></p>
              <p className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span>{it ? 'Non usare "CENTYR" o "centyr".' : 'Do not use "CENTYR" or "centyr".'}</span></p>
              <p className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" /><span>{it ? 'Puoi descrivere Centyr come "piattaforma AI per foto prodotto e-commerce".' : 'You may describe Centyr as "AI platform for e-commerce product photos".'}</span></p>
              <p className="flex items-start gap-2"><XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /><span>{it ? 'Non modificare i colori o le proporzioni del logo.' : 'Do not alter logo colors or proportions.'}</span></p>
            </div>
          </section>

          {/* Media contact */}
          <section className="bg-purple-50 rounded-xl p-5 border border-purple-100 text-sm">
            <h3 className="font-bold text-gray-900 mb-2">{it ? 'Contatto Media' : 'Media Contact'}</h3>
            <p className="text-gray-600">
              {it ? 'Per interviste, dichiarazioni o informazioni aggiuntive:' : 'For interviews, statements, or additional information:'}
            </p>
            <a href="mailto:support@centyr.tech?subject=Press inquiry" className="text-purple-600 hover:underline font-medium mt-1 inline-block">
              support@centyr.tech
            </a>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/about" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Chi Siamo' : 'About'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1"><ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
