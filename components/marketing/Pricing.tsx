'use client'

import { useState } from 'react'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/contexts/LanguageContext'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import PricingCard from '@/components/ui/PricingCard'

export default function Pricing() {
  const t = useTranslations()
  const { plans, isLoading, error } = usePricingPlans()
  const { isAuthenticated, user } = useAuth()
  const currentPlanId = user?.subscription?.plan
  const router = useRouter()
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)

  const planInfo = t.marketing.pricing.planInfo as Record<string, { description: string; features: string[] }>

  const handlePlanClick = async (plan: typeof plans[0]) => {
    if (plan.price === 0) {
      router.push(isAuthenticated ? '/dashboard' : '/signup')
      return
    }

    if (!plan.stripe_price_id) return

    if (!isAuthenticated) {
      sessionStorage.setItem('pending_plan_id', plan.id)
      sessionStorage.setItem('pending_price_id', plan.stripe_price_id)
      router.push('/login?redirect=/pricing')
      return
    }

    setLoadingPlanId(plan.stripe_product_id)
    try {
      const checkout = await api.createCheckoutSession({
        price_id: plan.stripe_price_id,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/pricing`,
      })
      window.location.href = checkout.checkout_url
    } catch (error: any) {
      toast.error(error.message || 'Failed to start checkout')
      setLoadingPlanId(null)
    }
  }

  const filteredPlans = plans
    .filter(plan => plan.id !== 'mini' && plan.name.toLowerCase() !== 'mini')
    .filter(plan => plan.price === 0 || plan.period === billingPeriod)
    .reduce((acc, plan) => {
      const exists = acc.find(p => p.stripe_product_id === plan.stripe_product_id)
      if (!exists) acc.push(plan)
      return acc
    }, [] as typeof plans)
    .sort((a, b) => a.price - b.price)

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.marketing.pricing.title}
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {t.marketing.pricing.subtitle}
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center bg-white rounded-full p-1 shadow-sm border border-purple-100">
            <button
              onClick={() => setBillingPeriod('month')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'month'
                ? 'gradient-purple-fuchsia text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {t.marketing.pricing.monthly}
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={`px-6 py-2 rounded-full font-semibold transition-all relative ${billingPeriod === 'year'
                ? 'gradient-purple-fuchsia text-white'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              {t.marketing.pricing.yearly}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-gray-900 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">{t.marketing.pricing.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center bg-red-50 border-2 border-red-200 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
            <p className="text-red-600 font-semibold">{t.marketing.pricing.errorTitle}</p>
            <p className="text-sm text-red-500 mt-2">{error}</p>
          </div>
        )}

        {/* Plans Grid */}
        {!isLoading && filteredPlans.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filteredPlans.map((plan, index) => {
              const key = plan.name.toLowerCase() as keyof typeof planInfo
              const translated = planInfo[key]
              const description = translated?.description || plan.description
              const features = translated?.features?.length ? translated.features : plan.features

              const isCurrent = isAuthenticated && !!currentPlanId && (
                currentPlanId === plan.id ||
                currentPlanId.toLowerCase() === plan.name.toLowerCase()
              )

              return (
                <div key={plan.stripe_product_id} className="w-full sm:w-[calc(50%-8px)] lg:w-[260px] flex-shrink-0">
                  <PricingCard
                    plan={plan}
                    billingPeriod={billingPeriod}
                    isCurrent={isCurrent}
                    isLoading={loadingPlanId === plan.stripe_product_id}
                    anyLoading={loadingPlanId !== null}
                    features={features}
                    description={description}
                    onSelect={() => handlePlanClick(plan)}
                    labels={{
                      current: t.marketing.pricing.currentPlanButton,
                      startFree: t.marketing.pricing.startFree,
                      upgrade: isAuthenticated ? t.marketing.pricing.upgrade : t.marketing.pricing.subscribe,
                      perMonth: t.marketing.pricing.perMonth,
                      billedYearly: t.marketing.pricing.billedYearly,
                    }}
                    animationDelay={index * 0.05}
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
