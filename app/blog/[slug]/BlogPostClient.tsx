'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { posts } from '../_data'
import { notFound } from 'next/navigation'

interface Props {
  slug: string
}

export default function BlogPostClient({ slug }: Props) {
  const { language } = useLanguage()
  const it = language === 'it'
  const post = posts.find(p => p.slug === slug)
  if (!post) notFound()

  const title = it ? post.title.it : post.title.en
  const body = it ? post.body.it : post.body.en

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <Link href="/blog" className="text-sm text-purple-600 hover:text-fuchsia-600 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-1" />{it ? 'Torna al Blog' : 'Back to Blog'}
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full">
            {it ? post.tag.it : post.tag.en}
          </span>
          <span className="text-xs text-gray-400">{it ? post.date.it : post.date.en}</span>
          <span className="text-xs text-gray-400">· {post.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">{title}</h1>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 md:p-10 space-y-6">
          {body.map((paragraph, i) => (
            <div key={i} className="text-gray-700 leading-relaxed text-[15px] whitespace-pre-line">
              {paragraph.split('\n').map((line, j) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={j} className="font-bold text-gray-900 mt-4 first:mt-0">{line.slice(2, -2)}</p>
                }
                if (line.startsWith('**')) {
                  const match = line.match(/^\*\*(.+?)\*\*(.*)/)
                  if (match) {
                    return <p key={j}><strong>{match[1]}</strong>{match[2]}</p>
                  }
                }
                if (line.startsWith('- ')) {
                  return <p key={j} className="ml-4">• {line.slice(2)}</p>
                }
                return line ? <p key={j}>{line}</p> : null
              })}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-6 text-center">
          <p className="font-bold text-gray-900 mb-2">{it ? 'Prova Centyr gratuitamente' : 'Try Centyr for free'}</p>
          <p className="text-sm text-gray-500 mb-4">
            {it ? '3 jobs gratuiti al mese. Nessuna carta di credito.' : '3 free jobs per month. No credit card required.'}
          </p>
          <Link
            href="/signup"
            className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
          >
            <span className="inline-flex items-center gap-1">{it ? 'Inizia gratuitamente' : 'Start for free'} <ArrowRight className="w-4 h-4" /></span>
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Link href="/blog" className="text-purple-600 hover:text-fuchsia-600 font-semibold text-sm transition-colors">
            <ArrowLeft className="w-4 h-4 inline mr-1" />{it ? 'Tutti gli articoli' : 'All articles'}
          </Link>
        </div>
      </div>
    </div>
  )
}
