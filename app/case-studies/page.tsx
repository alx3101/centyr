'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const cases = [
  {
    sector: { en: 'Fashion & Apparel', it: 'Moda & Abbigliamento' },
    result: { en: '90% time saved', it: '90% di tempo risparmiato' },
    en: {
      title: 'Boutique with 800+ SKUs eliminates photo editing',
      body: 'A clothing boutique was spending 3–4 hours per week manually cropping and centering product photos for their Shopify store. After integrating Centyr, the same workflow now takes under 15 minutes: upload the batch, download the ZIP, publish.',
      metrics: ['3h → 15min per week', '800+ SKUs processed', 'Consistent white background across all listings'],
    },
    it: {
      title: 'Boutique con 800+ SKU elimina il photo editing',
      body: 'Una boutique di abbigliamento spendeva 3-4 ore a settimana a ritagliare e centrare manualmente le foto prodotto per il loro store Shopify. Dopo aver integrato Centyr, lo stesso flusso richiede meno di 15 minuti: carica il batch, scarica il ZIP, pubblica.',
      metrics: ['3h → 15min a settimana', '800+ SKU elaborati', 'Sfondo bianco uniforme su tutte le inserzioni'],
    },
  },
  {
    sector: { en: 'Home & Furniture', it: 'Casa & Arredamento' },
    result: { en: '5× faster time-to-market', it: '5× più veloce time-to-market' },
    en: {
      title: 'Furniture brand standardizes images across 3 channels',
      body: 'A mid-size furniture brand sells on Amazon, their own website, and a B2B portal — each requiring different image dimensions. Centyr processes each product photo three times automatically with preset output profiles, eliminating duplicate editing work.',
      metrics: ['3 output formats per image, automated', 'Amazon + Website + B2B portal covered', 'New products listed 5× faster'],
    },
    it: {
      title: 'Brand arredamento standardizza immagini su 3 canali',
      body: 'Un brand di arredamento di medie dimensioni vende su Amazon, sul proprio sito web e su un portale B2B — ognuno con dimensioni immagine diverse. Centyr elabora ogni foto prodotto tre volte automaticamente con profili di output preimpostati, eliminando il lavoro di editing duplicato.',
      metrics: ['3 formati output per immagine, automatizzati', 'Amazon + Sito web + Portale B2B coperti', 'Nuovi prodotti listati 5× più velocemente'],
    },
  },
  {
    sector: { en: 'Photography Studio', it: 'Studio Fotografico' },
    result: { en: '40% margin improvement', it: '40% di miglioramento dei margini' },
    en: {
      title: 'Product photography studio adds Centyr to its post-processing pipeline',
      body: 'A studio offering product photography to local e-commerce businesses integrated Centyr into their delivery pipeline. They now offer "upload-ready" packages — photos are automatically processed before delivery, removing a full day of Photoshop work from every project.',
      metrics: ['Post-processing time: 8h → 45min per project', 'Offered as a premium upsell service', 'Client satisfaction improved significantly'],
    },
    it: {
      title: 'Studio fotografico aggiunge Centyr alla pipeline di post-processing',
      body: 'Uno studio che offre fotografia prodotto a e-commerce locali ha integrato Centyr nella propria pipeline di consegna. Ora offrono pacchetti "pronti al caricamento" — le foto vengono elaborate automaticamente prima della consegna, eliminando una giornata intera di lavoro Photoshop da ogni progetto.',
      metrics: ['Post-processing: 8h → 45min per progetto', 'Offerto come upsell premium', 'Soddisfazione clienti migliorata significativamente'],
    },
  },
]

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
              <div key={i} className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                    {it ? c.sector.it : c.sector.en}
                  </span>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    {it ? c.result.it : c.result.en}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{content.title}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{content.body}</p>
                <ul className="space-y-1">
                  {content.metrics.map(m => (
                    <li key={m} className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="text-green-500">✓</span> {m}
                    </li>
                  ))}
                </ul>
              </div>
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
            {it ? 'Inizia gratuitamente →' : 'Start for free →'}
          </Link>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/blog" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Blog</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">{it ? '← Torna alla Home' : '← Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
