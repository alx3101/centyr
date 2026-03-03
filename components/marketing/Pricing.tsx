'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslations } from '@/contexts/LanguageContext'

export default function Pricing() {
  const t = useTranslations()
  const { plans, isLoading, error } = usePricingPlans()
  const { isAuthenticated } = useAuth()
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month')

  // Raggruppa i piani per stripe_product_id e filtra per periodo
  const filteredPlans = plans
    .filter(plan => plan.period === billingPeriod)
    .reduce((acc, plan) => {
      // Evita duplicati: mantieni solo un piano per stripe_product_id
      const exists = acc.find(p => p.stripe_product_id === plan.stripe_product_id)
      if (!exists) {
        acc.push(plan)
      }
      return acc
    }, [] as typeof plans)
    .sort((a, b) => a.price - b.price) // Ordina per prezzo crescente

  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
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
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {filteredPlans.map((plan) => {
              const getCTA = () => {
                if (plan.price === 0) return t.marketing.pricing.startFree
                if (plan.monthly_limit >= 500) return t.marketing.pricing.contactSales
                return isAuthenticated ? t.marketing.pricing.upgrade : t.marketing.pricing.startTrial
              }

              const getCTALink = () => {
                if (plan.price === 0) return isAuthenticated ? '/dashboard' : '/signup'
                if (plan.monthly_limit >= 500) return '#contact'
                return isAuthenticated ? '/dashboard/billing' : '/signup'
              }

              return (
                <div
                  key={plan.stripe_product_id}
                  className={`rounded-2xl p-8 flex flex-col items-start shadow-lg hover:shadow-xl w-full sm:w-64 lg:w-72 transition-all duration-300 ${plan.popular
                    ? 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-200'
                    : 'bg-white border border-gray-200'
                    }`}
                >
                  {plan.popular && (
                    <div className="mb-4">
                      <span className="gradient-purple-fuchsia text-white px-4 py-1.5 rounded-full text-xs font-bold">
                        {t.marketing.pricing.mostPopular}
                      </span>
                    </div>
                  )}
                  <h3 className="text-sm font-bold mb-3 text-gray-600">
                    {plan.name.toUpperCase()}
                  </h3>
                  <div className="mb-6 min-h-[65px]">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.currency === 'EUR' ? '€' : '$'}
                      {plan.period === 'year' ? (plan.price / 12).toFixed(2) : plan.price.toFixed(2)}
                    </span>
                    <span className="text-gray-600">
                      {t.marketing.pricing.perMonth}
                    </span>
                    {plan.period === 'year' && (
                      <div className="text-sm mt-1 text-gray-500">
                        {plan.currency === 'EUR' ? '€' : '$'}{plan.price.toFixed(2)} {t.marketing.pricing.billedYearly}
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="mr-2 flex-shrink-0 text-gray-900">✓</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getCTALink()}
                    className={`block w-full text-center px-6 py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 ${plan.popular
                      ? 'gradient-purple-fuchsia text-white'
                      : 'bg-white border-2 border-purple-300 text-gray-900 hover:border-purple-400'
                      }`}
                  >
                    {getCTA()}
                  </Link>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
