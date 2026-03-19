'use client'

import { useState, useEffect } from 'react'
import { Cookie, X, Shield, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from '@/contexts/LanguageContext'

const STORAGE_KEY = 'centyr_cookie_consent'

export default function CookieBanner() {
  const t = useTranslations()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY)
    if (!consent) {
      // Small delay so it doesn't flash on first render
      const timer = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, date: new Date().toISOString() }))
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, date: new Date().toISOString() }))
    setVisible(false)
  }

  if (!visible) return null

  const c = t.cookieBanner

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-fuchsia-500" />

          <div className="p-5 md:p-6">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="shrink-0 w-10 h-10 gradient-purple-fuchsia rounded-xl flex items-center justify-center shadow-md">
                <Cookie className="w-5 h-5 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">{c.title}</h3>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full font-semibold">
                    <Shield className="w-3 h-3" />
                    GDPR
                  </span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {c.description}{' '}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2 inline-flex items-center gap-0.5">
                    {c.privacyLink}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  {' '}{c.and}{' '}
                  <Link href="/gdpr-compliance" className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-2 inline-flex items-center gap-0.5">
                    {c.gdprLink}
                    <ExternalLink className="w-3 h-3" />
                  </Link>.
                </p>

                {/* Cookie details */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    auth_token — {c.sessionCookie}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    user — {c.sessionCookie}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-purple-50 border border-purple-200 text-purple-700 px-2.5 py-1 rounded-full font-medium">
                    {c.noTracking}
                  </span>
                </div>
              </div>

              {/* Close button (same as decline) */}
              <button
                onClick={decline}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-wrap gap-2 justify-end">
              <button
                onClick={decline}
                className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              >
                {c.decline}
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-sm font-bold text-white gradient-purple-fuchsia rounded-xl shadow-md hover:scale-105 transition-all duration-200"
              >
                {c.accept}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
