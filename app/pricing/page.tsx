'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Check, Zap, Crown, Loader, Building2, Headphones, Shield, Users, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import { useTranslations } from '@/contexts/LanguageContext'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const t = useTranslations()
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')
  const { plans: pricingPlans, isLoading: plansLoading } = usePricingPlans()

  const planInfo = t.marketing.pricing.planInfo as Record<string, { description: string; features: string[] }>

  const startCheckout = async (stripePriceId: string, planId: string) => {
    setLoadingPlanId(planId)
    try {
      const checkout = await api.createCheckoutSession({
        price_id: stripePriceId,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/pricing`,
      })
      window.location.href = checkout.checkout_url
    } catch (error: any) {
      toast.error(error.message || 'Failed to start checkout')
      setLoadingPlanId(null)
    }
  }

  // After login redirect: auto-trigger checkout if there's a pending plan
  useEffect(() => {
    if (!isAuthenticated) return
    const pendingPlanId = sessionStorage.getItem('pending_plan_id')
    const pendingPriceId = sessionStorage.getItem('pending_price_id')
    if (pendingPlanId && pendingPriceId) {
      sessionStorage.removeItem('pending_plan_id')
      sessionStorage.removeItem('pending_price_id')
      startCheckout(pendingPriceId, pendingPlanId)
    }
  }, [isAuthenticated])

  if (plansLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {t.marketing.pricing.title}
            </h1>
          </div>
          <div className="flex items-center justify-center">
            <Loader className="w-12 h-12 animate-spin text-purple-600" />
          </div>
        </div>
      </div>
    )
  }

  const handleUpgrade = async (stripePriceId: string | null, planId: string) => {
    if (!stripePriceId) {
      toast.error('This plan cannot be purchased online')
      return
    }
    if (!isAuthenticated) {
      sessionStorage.setItem('pending_plan_id', planId)
      sessionStorage.setItem('pending_price_id', stripePriceId)
      router.push('/login?redirect=/pricing')
      return
    }
    await startCheckout(stripePriceId, planId)
  }

  // Filter and deduplicate plans by billing period
  const filteredPlans = pricingPlans
    .filter(plan => plan.price === 0 || plan.period === billingPeriod)
    .reduce((acc, plan) => {
      const exists = acc.find(p => p.stripe_product_id === plan.stripe_product_id)
      if (!exists) acc.push(plan)
      return acc
    }, [] as typeof pricingPlans)
    .sort((a, b) => a.price - b.price)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {t.marketing.pricing.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t.marketing.pricing.subtitle}
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-purple-100">
            <button
              onClick={() => setBillingPeriod('month')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'month' ? 'gradient-purple-fuchsia text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {t.marketing.pricing.monthly}
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'year' ? 'gradient-purple-fuchsia text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              {t.marketing.pricing.yearly}
            </button>
          </div>
        </div>

        {/* Current Plan Info */}
        {isAuthenticated && user && (
          <div className="bg-gradient-to-r from-purple-100 to-fuchsia-100 border-2 border-purple-200 rounded-xl p-6 mb-10 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Piano attuale: {user.subscription.plan_name?.toUpperCase()}</h3>
                <p className="text-gray-600">
                  {user.subscription.current_period_uploads} / {user.subscription.monthly_limit} job usati questo mese
                </p>
              </div>
              <div className="w-full md:w-64 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((user.subscription.current_period_uploads / user.subscription.monthly_limit) * 100, 100)}%` }}
                />
              </div>
              <Link
                href="/billing"
                className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold whitespace-nowrap"
              >
                Gestisci abbonamento
              </Link>
            </div>
          </div>
        )}

        {/* Pricing Cards — 5 columns at lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {filteredPlans.map((plan, index) => {
            const key = plan.name.toLowerCase() as keyof typeof planInfo
            const translated = planInfo[key]
            const description = translated?.description || plan.description
            const features = translated?.features?.length ? translated.features : plan.features
            const isPaid = plan.price > 0
            const isCurrent = user?.subscription?.plan === plan.stripe_product_id
            const isDisabled = isCurrent || !isPaid

            return (
              <div
                key={plan.stripe_product_id}
                className={`relative rounded-2xl p-5 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up ${plan.popular
                  ? 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-300'
                  : 'bg-white border border-gray-200'
                  }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="gradient-purple-fuchsia text-white px-4 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1">
                      <Crown className="w-3 h-3" />
                      TOP
                    </div>
                  </div>
                )}
                {isCurrent && (
                  <div className="absolute top-3 right-3">
                    <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                      ATTUALE
                    </div>
                  </div>
                )}

                <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-1">{plan.name.toUpperCase()}</h2>
                <p className="text-xs text-gray-500 mb-3 min-h-[32px]">{description}</p>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price === 0 ? '€0' : `€${billingPeriod === 'year' ? (plan.price / 12).toFixed(2) : plan.price.toFixed(2)}`}
                  </span>
                  <span className="text-gray-500 text-sm">{t.marketing.pricing.perMonth}</span>
                  {billingPeriod === 'year' && plan.price > 0 && (
                    <div className="text-xs mt-0.5 text-gray-400">€{plan.price.toFixed(2)} {t.marketing.pricing.billedYearly}</div>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-xs">
                      <div className="w-4 h-4 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-green-600" />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleUpgrade(plan.stripe_price_id, plan.stripe_product_id)}
                  disabled={isDisabled || loadingPlanId !== null}
                  className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${plan.popular
                    ? 'gradient-purple-fuchsia text-white hover:scale-105 shadow-lg'
                    : isPaid
                      ? 'bg-white border-2 border-purple-300 text-gray-900 hover:border-purple-400 hover:scale-105'
                      : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {loadingPlanId === plan.stripe_product_id ? (
                    <><Loader className="w-4 h-4 animate-spin" /> ...</>
                  ) : isCurrent ? 'Piano attuale' : plan.price === 0 ? t.marketing.pricing.startFree : t.marketing.pricing.upgrade}
                </button>
              </div>
            )
          })}
        </div>

        {/* Enterprise Plan */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 border-2 border-gray-700 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-fuchsia-500 rounded-full filter blur-3xl opacity-10"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                  <Building2 className="w-4 h-4" />
                  ENTERPRISE
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise Solution</h3>
                <p className="text-gray-300 text-lg mb-6">
                  Per aziende con esigenze avanzate. Volume illimitato, integrazioni custom, SLA garantito e supporto dedicato.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Zap, title: 'Volume illimitato', desc: 'Nessun limite mensile' },
                    { icon: Shield, title: 'SLA 99.99%', desc: 'Uptime garantito' },
                    { icon: Users, title: 'Team dedicato', desc: 'Account manager' },
                    { icon: Headphones, title: 'Supporto 24/7', desc: 'Priorità massima' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{title}</p>
                        <p className="text-gray-400 text-sm">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <p className="text-gray-400 text-sm mb-2">A partire da</p>
                  <div className="text-4xl font-bold text-white mb-1">Custom</div>
                  <p className="text-gray-400 text-sm mb-6">Pricing su misura</p>
                  <a
                    href="mailto:enterprise@centyr.io?subject=Enterprise%20Plan%20Request"
                    className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                  >
                    <Building2 className="w-5 h-5" />
                    Contatta Sales
                  </a>
                  <p className="text-gray-500 text-xs mt-4">Risposta entro 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Domande Frequenti</h2>
          <div className="space-y-6">
            {[
              { q: 'Posso cancellare quando voglio?', a: "Sì! Puoi cancellare l'abbonamento in qualsiasi momento. Continuerai ad avere accesso fino alla fine del periodo di fatturazione." },
              { q: 'Cosa succede se supero la quota?', a: "Dovrai aspettare il mese successivo o fare upgrade a un piano superiore. Ti notificheremo quando sei vicino al limite." },
              { q: 'Offrite rimborsi?', a: "Sì, offriamo una garanzia soddisfatti o rimborsati di 30 giorni. Contatta il supporto per un rimborso completo." },
            ].map(({ q, a }) => (
              <div key={q} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-gray-600">{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link href="/" className="text-purple-600 hover:text-fuchsia-600 font-semibold">
            <ArrowLeft className="w-4 h-4 inline mr-1" />Torna alla Home
          </Link>
        </div>
      </div>
    </div>
  )
}
