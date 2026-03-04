'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">{it ? 'Chi Siamo' : 'About Us'}</h1>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            {it
              ? 'Centyr automatizza la preparazione delle foto prodotto per l\'e-commerce tramite intelligenza artificiale.'
              : 'Centyr automates e-commerce product photo preparation using artificial intelligence.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-10 text-gray-700 leading-relaxed">

          {/* Mission */}
          <section className="text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{it ? 'La Nostra Missione' : 'Our Mission'}</h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              {it
                ? 'Eliminare il lavoro manuale ripetitivo nella produzione di immagini e-commerce. Ogni foto deve essere centrata, pulita e pronta alla pubblicazione — senza toccare Photoshop.'
                : 'Eliminate repetitive manual work in e-commerce image production. Every photo should be centered, clean, and publication-ready — without touching Photoshop.'}
            </p>
          </section>

          <hr className="border-purple-100" />

          {/* Story */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{it ? 'Perché Centyr' : 'Why Centyr'}</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                {it
                  ? 'Chi gestisce un catalogo e-commerce sa quanto tempo si spende a ritagliare, centrare e uniformare le foto prodotto. Un\'ora al giorno di editing manuale significa settimane perse ogni anno — tempo che potrebbe andare alle vendite, al marketing, al business.'
                  : 'Anyone managing an e-commerce catalog knows how much time is spent cropping, centering, and standardizing product photos. One hour per day of manual editing means weeks lost every year — time that could go toward sales, marketing, and business growth.'}
              </p>
              <p>
                {it
                  ? 'Centyr risolve questo con una pipeline AI che analizza ogni immagine, individua il soggetto, lo centra con precisione pixel-perfect, rimuove lo sfondo se richiesto e genera output nelle dimensioni esatte per Amazon, Shopify, WooCommerce o qualsiasi altro marketplace.'
                  : 'Centyr solves this with an AI pipeline that analyzes each image, identifies the subject, centers it with pixel-perfect precision, removes the background if needed, and generates output in the exact dimensions for Amazon, Shopify, WooCommerce, or any other marketplace.'}
              </p>
            </div>
          </section>

          {/* Values */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{it ? 'Come Lavoriamo' : 'How We Work'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(it ? [
                { icon: '⚡', title: 'Batch-first', desc: 'Progettato per volumi. Carica 1 immagine o 500 — la pipeline scala automaticamente senza perdere velocità.' },
                { icon: '🔒', title: 'Privacy by design', desc: 'Nessun training sui tuoi dati. Immagini eliminate automaticamente dopo 30 giorni. Infrastruttura EU (Paris).' },
                { icon: '🎨', title: 'Output pronti', desc: 'Risultati subito pubblicabili: sfondi bianchi, proporzioni corrette, centramento preciso al pixel.' },
              ] : [
                { icon: '⚡', title: 'Batch-first', desc: 'Designed for volume. Upload 1 image or 500 — the pipeline scales automatically without losing speed.' },
                { icon: '🔒', title: 'Privacy by design', desc: 'No training on your data. Images automatically deleted after 30 days. EU infrastructure (Paris).' },
                { icon: '🎨', title: 'Ready-to-publish output', desc: 'Immediately publishable results: white backgrounds, correct proportions, pixel-perfect centering.' },
              ]).map(({ icon, title, desc }) => (
                <div key={title} className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                  <div className="text-3xl mb-2">{icon}</div>
                  <p className="font-bold text-gray-900 mb-1">{title}</p>
                  <p className="text-xs text-gray-600">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Stack / trust */}
          <section className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 border border-purple-100">
            <h2 className="text-base font-bold text-gray-900 mb-3">{it ? 'Infrastruttura & Compliance' : 'Infrastructure & Compliance'}</h2>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {[
                it ? '🇪🇺 Dati sempre in Europa (AWS Paris)' : '🇪🇺 Data always in Europe (AWS Paris)',
                it ? '🔒 Crittografia TLS 1.3 + AES-256' : '🔒 TLS 1.3 + AES-256 encryption',
                it ? '✅ Conforme GDPR' : '✅ GDPR compliant',
                it ? '💳 Pagamenti Stripe PCI DSS L1' : '💳 Stripe PCI DSS L1 payments',
              ].map(item => <p key={item}>{item}</p>)}
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <p className="text-gray-600 mb-4 text-sm">
              {it ? 'Vuoi saperne di più o collaborare con noi?' : 'Want to learn more or work with us?'}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/contact"
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition text-sm"
              >
                {it ? 'Contattaci' : 'Contact us'}
              </Link>
              <Link
                href="/careers"
                className="border-2 border-purple-200 text-purple-700 font-semibold px-6 py-3 rounded-xl hover:bg-purple-50 transition text-sm"
              >
                {it ? 'Lavora con noi' : 'Careers'}
              </Link>
            </div>
          </section>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/press" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Press Kit</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">{it ? '← Torna alla Home' : '← Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
