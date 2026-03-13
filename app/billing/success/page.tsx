'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight, Zap, Package, Clock, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function BillingSuccessPage() {
  const router = useRouter()
  const { user, refreshUser } = useAuth()
  const [countdown, setCountdown] = useState(5)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Refresh user data, then wait a beat for state to settle
    refreshUser?.().finally(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready) return
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [ready, router])

  const sub = user?.subscription
  const planName = sub?.plan_name ?? '—'
  const isFree = sub?.plan === 'free'
  const monthlyLimit = sub?.monthly_limit ?? 0
  const features = sub?.features

  const featureItems = features ? [
    { icon: <Package className="w-4 h-4" />, label: `${monthlyLimit.toLocaleString()} jobs / mese` },
    { icon: <Zap className="w-4 h-4" />, label: features.priority_queue ? 'Coda prioritaria' : 'Coda standard' },
    { icon: <BarChart2 className="w-4 h-4" />, label: `Batch massimo: ${features.max_batch_size} immagini/job` },
    { icon: <Clock className="w-4 h-4" />, label: `Retention: ${features.storage_retention_days} giorni` },
  ] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Top bar */}
          <div className={`h-1.5 w-full ${isFree ? 'bg-gray-400' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`} />

          <div className="p-8 text-center">
            {/* Icon */}
            <div className="mb-5 inline-flex">
              <div className="bg-green-100 rounded-full p-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isFree ? 'Piano aggiornato' : `Piano ${planName} attivo`}
            </h1>
            <p className="text-gray-500 mb-8 text-sm">
              {isFree
                ? 'Sei passato al piano gratuito.'
                : 'Il tuo abbonamento è stato aggiornato correttamente.'}
            </p>

            {/* Features */}
            {featureItems.length > 0 && (
              <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Incluso nel tuo piano</p>
                {featureItems.map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-indigo-500">{f.icon}</span>
                    {f.label}
                  </div>
                ))}
                {features?.webhooks_enabled && (
                  <div className="flex items-center gap-3 text-sm text-gray-700">
                    <span className="text-indigo-500"><Zap className="w-4 h-4" /></span>
                    Webhooks abilitati
                  </div>
                )}
              </div>
            )}

            {/* Redirect notice */}
            <p className="text-xs text-gray-400 mb-5">
              {ready ? `Reindirizzamento in ${countdown}s…` : 'Caricamento…'}
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/dashboard"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-colors"
              >
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/dashboard/billing"
                className="flex-1 inline-flex items-center justify-center px-5 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Abbonamento
              </Link>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-8 py-4 text-center">
            <p className="text-xs text-gray-400">
              Ricevuta inviata via email · Gestisci il tuo{' '}
              <Link href="/dashboard/billing" className="text-indigo-600 hover:underline">
                abbonamento
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
