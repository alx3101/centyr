'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const tutorials = [
  {
    icon: '📤',
    duration: '3 min',
    en: { title: 'Your first upload: step by step', desc: 'How to upload your first product photos and configure processing options (size, background, margin).' },
    it: { title: 'Il tuo primo caricamento: passo dopo passo', desc: 'Come caricare le prime foto prodotto e configurare le opzioni di elaborazione (dimensione, sfondo, margine).' },
  },
  {
    icon: '🎨',
    duration: '4 min',
    en: { title: 'Background removal: best practices', desc: 'When to use AI background removal, how to get clean edges on complex products, and when to provide a custom background image.' },
    it: { title: 'Rimozione sfondo: best practice', desc: 'Quando usare la rimozione sfondo AI, come ottenere bordi puliti su prodotti complessi e quando fornire un\'immagine di sfondo personalizzata.' },
  },
  {
    icon: '📐',
    duration: '3 min',
    en: { title: 'Output sizes for Amazon, Shopify, eBay', desc: 'Configure the right pixel dimensions and aspect ratios for the most popular e-commerce platforms.' },
    it: { title: 'Dimensioni output per Amazon, Shopify, eBay', desc: 'Configura le giuste dimensioni in pixel e i rapporti d\'aspetto per le piattaforme e-commerce più popolari.' },
  },
  {
    icon: '🔌',
    duration: '8 min',
    en: { title: 'API integration: quickstart guide', desc: 'Authenticate, upload images, poll for results, and download outputs — all via the REST API in under 50 lines of code.' },
    it: { title: 'Integrazione API: guida rapida', desc: 'Autenticazione, caricamento immagini, polling dei risultati e download degli output — tutto via REST API in meno di 50 righe di codice.' },
  },
  {
    icon: '📦',
    duration: '5 min',
    en: { title: 'Batch processing at scale', desc: 'Process hundreds of SKUs efficiently: how to structure your batches, download ZIPs, and automate the pipeline.' },
    it: { title: 'Elaborazione batch su larga scala', desc: 'Elabora centinaia di SKU in modo efficiente: come strutturare i batch, scaricare ZIP e automatizzare la pipeline.' },
  },
]

export default function TutorialsPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {it ? 'Video Tutorial' : 'Video Tutorials'}
          </h1>
          <p className="text-gray-500 text-sm">
            {it
              ? 'Impara a usare Centyr in pochi minuti.'
              : 'Learn to use Centyr in minutes.'}
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-8 text-sm text-amber-800 text-center">
          🎬 {it
            ? 'I video tutorial sono in produzione e saranno disponibili a breve. Nel frattempo consulta le guide scritte qui sotto.'
            : 'Video tutorials are in production and coming soon. In the meantime, check out the written guides below.'}
        </div>

        <div className="space-y-4">
          {tutorials.map(({ icon, duration, en, it: itContent }) => (
            <div
              key={en.title}
              className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-xl shadow p-5 flex gap-4"
            >
              <div className="text-3xl shrink-0">{icon}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-bold text-gray-900 text-sm">{it ? itContent.title : en.title}</p>
                  <span className="text-xs text-gray-400 shrink-0">{duration}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">{it ? itContent.desc : en.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <p className="text-sm text-gray-600 mb-3">
            {it
              ? 'Hai domande specifiche? Il Centro Assistenza ha le risposte.'
              : 'Have specific questions? The Help Center has answers.'}
          </p>
          <Link
            href="/help"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
          >
            {it ? 'Centro Assistenza →' : 'Help Center →'}
          </Link>
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
