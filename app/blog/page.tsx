'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

const posts = [
  {
    slug: '#',
    date: { en: 'February 28, 2026', it: '28 febbraio 2026' },
    tag: { en: 'Guide', it: 'Guida' },
    title: {
      en: 'How to prepare product photos for Amazon in 2026',
      it: 'Come preparare le foto prodotto per Amazon nel 2026',
    },
    excerpt: {
      en: 'Amazon requires white backgrounds, specific pixel dimensions, and perfect centering. Here\'s how to meet their requirements automatically with Centyr.',
      it: 'Amazon richiede sfondi bianchi, dimensioni specifiche in pixel e centraggio perfetto. Ecco come soddisfare i loro requisiti automaticamente con Centyr.',
    },
    readTime: '5 min',
  },
  {
    slug: '#',
    date: { en: 'February 15, 2026', it: '15 febbraio 2026' },
    tag: { en: 'Case Study', it: 'Caso Studio' },
    title: {
      en: 'From 3 hours to 10 minutes: how a fashion brand automated photo editing',
      it: 'Da 3 ore a 10 minuti: come un brand fashion ha automatizzato il photo editing',
    },
    excerpt: {
      en: 'A boutique clothing brand with 800+ SKUs was spending an entire workday each week editing product photos. Centyr reduced that to 10 minutes of uploads.',
      it: 'Un brand di abbigliamento con 800+ SKU spendeva un\'intera giornata lavorativa a settimana per editare le foto prodotto. Centyr ha ridotto tutto a 10 minuti di caricamento.',
    },
    readTime: '7 min',
  },
  {
    slug: '#',
    date: { en: 'January 30, 2026', it: '30 gennaio 2026' },
    tag: { en: 'Tips', it: 'Consigli' },
    title: {
      en: '5 common mistakes in e-commerce product photography (and how to fix them automatically)',
      it: '5 errori comuni nella fotografia prodotto e-commerce (e come correggerli automaticamente)',
    },
    excerpt: {
      en: 'Inconsistent backgrounds, poor centering, wrong aspect ratios — these small errors cost conversions. Learn how AI processing eliminates them at scale.',
      it: 'Sfondi inconsistenti, centraggio impreciso, rapporti d\'aspetto errati — questi piccoli errori costano conversioni. Scopri come il processing AI li elimina su larga scala.',
    },
    readTime: '4 min',
  },
]

export default function BlogPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Blog</h1>
          <p className="text-gray-500 text-sm">
            {it
              ? 'Guide, casi studio e novità su fotografia prodotto e automazione e-commerce.'
              : 'Guides, case studies, and news on product photography and e-commerce automation.'}
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post, i) => (
            <Link
              key={i}
              href={post.slug}
              className="block bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-8 hover:border-purple-300 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
                  {it ? post.tag.it : post.tag.en}
                </span>
                <span className="text-xs text-gray-400">{it ? post.date.it : post.date.en}</span>
                <span className="text-xs text-gray-400">· {post.readTime}</span>
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                {it ? post.title.it : post.title.en}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                {it ? post.excerpt.it : post.excerpt.en}
              </p>
              <p className="mt-3 text-sm text-purple-600 font-medium">
                {it ? 'Leggi →' : 'Read →'}
              </p>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <h2 className="font-bold text-gray-900 mb-2">
            {it ? 'Resta aggiornato' : 'Stay updated'}
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            {it
              ? 'Nuovi articoli, guide e aggiornamenti prodotto direttamente nella tua inbox.'
              : 'New articles, guides, and product updates directly in your inbox.'}
          </p>
          <p className="text-sm text-gray-400">
            {it ? 'Iscriviti dalla dashboard dopo la registrazione.' : 'Subscribe from the dashboard after signing up.'}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/case-studies" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">
            {it ? 'Casi di Studio' : 'Case Studies'}
          </Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors">{it ? '← Torna alla Home' : '← Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
