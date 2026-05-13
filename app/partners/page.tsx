'use client'

import Link from 'next/link'
import { ShoppingCart, Building2, Plug, BookOpen, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

const partnerTypes = [
  {
    Icon: ShoppingCart,
    en: { title: 'E-commerce Platforms', desc: 'Shopify apps, WooCommerce plugins, PrestaShop integrations. Give your merchants automated product photo processing built into their workflow.' },
    it: { title: 'Piattaforme E-commerce', desc: 'App Shopify, plugin WooCommerce, integrazioni PrestaShop. Offri ai tuoi merchant l\'elaborazione automatica delle foto prodotto integrata nel loro flusso di lavoro.' },
  },
  {
    Icon: Building2,
    en: { title: 'Agencies & Studios', desc: 'Product photography studios and creative agencies. Automate repetitive post-processing and offer clients faster turnaround at scale.' },
    it: { title: 'Agenzie & Studi', desc: 'Studi di fotografia prodotto e agenzie creative. Automatizza il post-processing ripetitivo e offri ai clienti tempi di consegna più rapidi su larga scala.' },
  },
  {
    Icon: Plug,
    en: { title: 'Technology & API Integrations', desc: 'SaaS platforms and tools that need automated image processing capabilities. Integrate Centyr\'s API to enrich your product with automated photo standardization.' },
    it: { title: 'Tecnologia & Integrazioni API', desc: 'Piattaforme SaaS e strumenti che necessitano di capacità di elaborazione automatica delle immagini. Integra le API di Centyr per arricchire il tuo prodotto con la standardizzazione automatica delle foto.' },
  },
  {
    Icon: BookOpen,
    en: { title: 'Resellers & Consultants', desc: 'E-commerce consultants and resellers who want to offer Centyr to their clients and earn recurring revenue.' },
    it: { title: 'Rivenditori & Consulenti', desc: 'Consulenti e-commerce e rivenditori che vogliono offrire Centyr ai propri clienti e guadagnare revenue ricorrente.' },
  },
]

export default function PartnersPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Partner</h1>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            {it
              ? 'Costruiamo insieme il futuro della fotografia prodotto automatica.'
              : 'Let\'s build the future of automated product photography together.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 md:p-12 space-y-10 text-gray-700">

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">{it ? 'Tipi di Partnership' : 'Partnership Types'}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partnerTypes.map(({ Icon, en, it: itContent }) => (
                <div key={en.title} className="bg-purple-50 rounded-xl p-5 border border-purple-100">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm"><Icon className="w-5 h-5 text-purple-600" /></div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">{it ? itContent.title : en.title}</h3>
                  <p className="text-xs text-gray-600">{it ? itContent.desc : en.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{it ? 'Vantaggi del Programma Partner' : 'Partner Program Benefits'}</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              {(it ? [
                'Accesso anticipato alle nuove funzionalità',
                'Revenue sharing su abbonamenti riferiti',
                'Supporto tecnico dedicato per l\'integrazione API',
                'Badge "Centyr Partner" e co-marketing',
                'Dashboard partner con analytics e reporting',
                'Prezzi speciali per volumi elevati',
              ] : [
                'Early access to new features',
                'Revenue sharing on referred subscriptions',
                'Dedicated technical support for API integration',
                '"Centyr Partner" badge and co-marketing',
                'Partner dashboard with analytics and reporting',
                'Special pricing for high volumes',
              ]).map(item => (
                <li key={item} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl p-6 border border-purple-100 text-center">
            <h2 className="font-bold text-gray-900 mb-2">
              {it ? 'Diventa Partner' : 'Become a Partner'}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {it
                ? 'Il programma partner è attualmente in fase di lancio. Contattaci per essere tra i primi ad aderire.'
                : 'The partner program is currently in launch phase. Contact us to be among the first to join.'}
            </p>
            <a
              href="mailto:enterprise@centyr.io?subject=Partner Program"
              className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
            >
              <span className="inline-flex items-center gap-1">{it ? 'Contattaci' : 'Contact us'} <ArrowRight className="w-4 h-4" /></span>
            </a>
            <p className="text-xs text-gray-400 mt-3">enterprise@centyr.io</p>
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
