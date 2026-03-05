'use client'

import Link from 'next/link'
import { Rocket, MessageSquare, Palette, Wrench, Megaphone, GraduationCap, HelpCircle, FileText, Video, Mail, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function CommunityPage() {
  const { language } = useLanguage()
  const it = language === 'it'

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-6">Centyr</Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Community</h1>
          <p className="text-gray-500 text-sm">
            {it
              ? 'Connettiti con altri utenti Centyr, condividi workflow e ricevi supporto.'
              : 'Connect with other Centyr users, share workflows, and get support.'}
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-100 rounded-2xl shadow-xl p-8 space-y-8 text-gray-700">

          {/* Coming soon */}
          <div className="text-center py-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-2xl mb-4">
              <Rocket className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {it ? 'La community sta arrivando' : 'Community coming soon'}
            </h2>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              {it
                ? 'Stiamo costruendo uno spazio dedicato dove utenti, partner e il team Centyr possano collaborare, condividere workflow e darsi supporto reciproco.'
                : 'We\'re building a dedicated space where users, partners, and the Centyr team can collaborate, share workflows, and support each other.'}
            </p>
          </div>

          {/* What to expect */}
          <div>
            <h3 className="font-bold text-gray-900 mb-4">{it ? 'Cosa troverai' : 'What to expect'}</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              {([
                { Icon: MessageSquare, text: it ? 'Forum di discussione su workflow, best practice e configurazioni' : 'Discussion forums on workflows, best practices, and configurations' },
                { Icon: Palette, text: it ? 'Galleria di output: ispirati ai risultati di altri utenti' : 'Output gallery: get inspired by other users\' results' },
                { Icon: Wrench, text: it ? 'Integrations showcase: script, automazioni e connettori condivisi dalla community' : 'Integrations showcase: scripts, automations, and connectors shared by the community' },
                { Icon: Megaphone, text: it ? 'Canale diretto per feature request e feedback al team Centyr' : 'Direct channel for feature requests and feedback to the Centyr team' },
                { Icon: GraduationCap, text: it ? 'Q&A moderato dal team per domande tecniche e casi d\'uso' : 'Team-moderated Q&A for technical questions and use cases' },
              ] as { Icon: (p: { className?: string }) => JSX.Element; text: string }[]).map(({ Icon, text }) => (
                <li key={text} className="flex gap-3 items-start">
                  <Icon className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notify */}
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-100 text-center">
            <h3 className="font-bold text-gray-900 mb-2">
              {it ? 'Vuoi essere tra i primi?' : 'Want to be among the first?'}
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              {it
                ? 'Scrivici e ti avviseremo al lancio. Gli early member avranno badge speciali e accesso anticipato.'
                : 'Write to us and we\'ll notify you at launch. Early members will get special badges and early access.'}
            </p>
            <a
              href="mailto:support@centyr.tech?subject=Community early access"
              className="inline-block bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:opacity-90 transition text-sm"
            >
              <span className="inline-flex items-center gap-1">{it ? 'Avvisami al lancio' : 'Notify me at launch'} <ArrowRight className="w-4 h-4" /></span>
            </a>
          </div>

          {/* In the meantime */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">{it ? 'Nel frattempo' : 'In the meantime'}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <Link href="/help" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition">
                <HelpCircle className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">{it ? 'Centro Assistenza' : 'Help Center'}</span>
              </Link>
              <Link href="/blog" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition">
                <FileText className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">Blog</span>
              </Link>
              <Link href="/tutorials" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition">
                <Video className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">{it ? 'Tutorial' : 'Tutorials'}</span>
              </Link>
              <a href="mailto:support@centyr.tech" className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-purple-200 transition">
                <Mail className="w-4 h-4 text-purple-500" />
                <span className="text-gray-700">{it ? 'Supporto diretto' : 'Direct support'}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 text-sm text-gray-500">
          <Link href="/blog" className="text-purple-600 hover:text-fuchsia-600 font-semibold transition-colors">Blog</Link>
          <span>·</span>
          <Link href="/" className="hover:text-gray-700 transition-colors flex items-center gap-1"><ArrowLeft className="w-4 h-4" />{it ? 'Torna alla Home' : 'Back to Home'}</Link>
        </div>
      </div>
    </div>
  )
}
