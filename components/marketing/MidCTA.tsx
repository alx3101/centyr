'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function MidCTA() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <section className="py-14 bg-gradient-to-r from-purple-600 to-fuchsia-600">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="text-white/80 text-sm font-semibold uppercase tracking-widest mb-3">
          {it ? 'Pronto a iniziare?' : 'Ready to start?'}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {it ? 'Elabora il tuo primo batch gratuitamente' : 'Process your first batch for free'}
        </h2>
        <p className="text-purple-100 mb-8 text-lg">
          {it ? '3 job gratuiti al mese. Nessuna carta di credito.' : '3 free jobs/month. No credit card required.'}
        </p>
        <Link
          href="/signup"
          className="inline-flex items-center gap-2 bg-white text-purple-700 font-bold px-8 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
        >
          {it ? 'Inizia gratuitamente' : 'Start for free'} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
