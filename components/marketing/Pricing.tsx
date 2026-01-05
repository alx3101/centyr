'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import { useAuth } from '@/contexts/AuthContext'

export default function Pricing() {
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
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Start free. Upgrade when you need more. Cancel anytime.
          </p>

          {/* Billing Period Toggle */}
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-full p-1 shadow-lg">
            <button
              onClick={() => setBillingPeriod('month')}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${billingPeriod === 'month'
                ? 'gradient-purple-fuchsia text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('year')}
              className={`px-6 py-2 rounded-full font-semibold transition-all relative ${billingPeriod === 'year'
                ? 'gradient-purple-fuchsia text-white shadow-lg'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading pricing plans...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="text-center bg-red-50 border-2 border-red-200 rounded-2xl p-6 max-w-2xl mx-auto mb-12">
            <p className="text-red-600 font-semibold">Failed to load pricing plans</p>
            <p className="text-sm text-red-500 mt-2">{error}</p>
          </div>
        )}

        {/* Plans Grid */}
        {!isLoading && filteredPlans.length > 0 && (
          <div className={`grid grid-cols-1 gap-6 mb-12 transition-all duration-500 ${filteredPlans.length === 2
            ? 'md:grid-cols-2 max-w-4xl mx-auto'
            : filteredPlans.length === 3
              ? 'md:grid-cols-2 lg:grid-cols-3'
              : 'md:grid-cols-2 lg:grid-cols-4'
            }`}>
            {filteredPlans.map((plan, index) => {
              const getCTA = () => {
                if (plan.price === 0) return 'Start Free'
                if (plan.monthly_limit >= 500) return 'Contact Sales'
                return isAuthenticated ? 'Upgrade' : 'Start 14-Day Trial'
              }

              const getCTALink = () => {
                if (plan.price === 0) return isAuthenticated ? '/dashboard' : '/signup'
                if (plan.monthly_limit >= 500) return '#contact'
                return isAuthenticated ? '/dashboard/billing' : '/signup'
              }

              return (
                <div
                  key={`${plan.id}-${billingPeriod}`}
                  className={`rounded-2xl p-6 relative transform hover:scale-105 transition-all duration-300 animate-fade-in ${plan.popular
                    ? 'gradient-animated text-white ring-4 ring-fuchsia-400 ring-offset-4 shadow-2xl glow-purple-strong'
                    : 'bg-white/80 backdrop-blur-sm border-2 border-purple-200 hover:border-fuchsia-400'
                    }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#F59E0B] text-white px-4 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                      ⭐ Most Popular
                    </div>
                  )}
                  <h3 className={`text-sm font-bold mb-3 ${plan.popular ? 'text-purple-100' : 'text-gray-600'}`}>
                    {plan.name.toUpperCase()}
                  </h3>
                  <div className="mb-6">
                    <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                      {plan.currency === 'EUR' ? '€' : '$'}
                      {plan.period === 'year' ? (plan.price / 12).toFixed(2) : plan.price.toFixed(2)}
                    </span>
                    <span className={plan.popular ? 'text-purple-100' : 'text-gray-600'}>
                      /month
                    </span>
                    {plan.period === 'year' && (
                      <div className={`text-sm mt-1 ${plan.popular ? 'text-purple-100' : 'text-gray-500'}`}>
                        {plan.currency === 'EUR' ? '€' : '$'}{plan.price.toFixed(2)} billed yearly
                      </div>
                    )}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className={`mr-2 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-[#10B981]'}`}>
                          ✓
                        </span>
                        <span className={plan.popular ? 'text-purple-50' : 'text-gray-600'}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={getCTALink()}
                    className={`block w-full text-center px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 ${plan.popular
                      ? 'bg-white text-primary-600 hover:shadow-xl'
                      : 'gradient-purple-fuchsia text-white hover:glow-purple'
                      }`}
                  >
                    {getCTA()}
                  </Link>
                </div>
              )
            })}
          </div>
        )}

        {/* Money-Back Guarantee */}
        <div className="text-center bg-white/80 backdrop-blur-sm border-2 border-secondary rounded-2xl p-6 max-w-2xl mx-auto hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl">💰</span>
            <div className="text-left">
              <h3 className="font-bold text-gray-900 text-lg">30-Day Money-Back Guarantee</h3>
              <p className="text-gray-600">Not happy? Get a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
