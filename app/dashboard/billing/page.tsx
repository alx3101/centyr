'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import Link from 'next/link'
import { CreditCard, Calendar, ExternalLink, AlertCircle, Loader, Sparkles, Zap, TrendingUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { api } from '@/lib/api'

export default function BillingPage() {
  const { user } = useAuth()
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const { plans: pricingPlans, isLoading: plansLoading } = usePricingPlans()

  const handleUpgrade = async (stripePriceId: string | null, planId: string) => {
    if (!stripePriceId) {
      toast.error('This plan cannot be purchased online')
      return
    }

    setLoadingPlanId(planId)
    try {
      const checkout = await api.createCheckoutSession({
        price_id: stripePriceId,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/dashboard/billing`,
      })

      // Redirect to Stripe Checkout
      window.location.href = checkout.checkout_url
    } catch (error: any) {
      toast.error(error.message || 'Failed to start checkout')
      setLoadingPlanId(null)
    }
  }

  const handleManageBilling = async () => {
    setIsLoadingPortal(true)
    try {
      const response = await api.createCustomerPortal({
        return_url: window.location.href
      })

      // Redirect to Stripe Customer Portal
      window.location.href = response.portal_url
    } catch (error: any) {
      toast.error(error.message || 'Failed to open billing portal')
      setIsLoadingPortal(false)
    }
  }

  if (!user) {
    return null
  }

  // Filter plans by billing period and format for UI
  const filteredPlans = pricingPlans.filter(plan => {
    // Keep free plan always
    if (plan.price === 0) return true
    // Filter by period
    return plan.period === (billingPeriod === 'monthly' ? 'month' : 'year')
  })

  const plans = filteredPlans.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: plan.price,
    quota: plan.monthly_limit,
    features: plan.features,
    popular: plan.popular,
    stripePriceId: plan.stripe_price_id,
    period: plan.period
  }))

  const currentPlan = user.subscription
  const usagePercentage = (user.subscription.current_period_uploads / user.subscription.monthly_limit) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-8 px-4 md:px-8 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-200 rounded-full filter blur-3xl opacity-20 animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-4 border border-purple-100">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-gray-700">Subscription Management</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Billing & Subscription</span>
          </h1>
          <p className="text-lg text-gray-600">
            Manage your subscription and billing information
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Subscription Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 gradient-purple-fuchsia rounded-xl flex items-center justify-center shadow-md">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Current Subscription</h2>
              </div>
              <span className="px-5 py-2 gradient-purple-fuchsia text-white text-sm font-bold rounded-full shadow-lg glow-purple">
                {currentPlan.plan_name.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-5 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-md">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Monthly Quota</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{user.subscription.monthly_limit}</p>
                <p className="text-sm text-gray-500 mt-1">jobs/month</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-5 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Used This Month</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{user.subscription.current_period_uploads}</p>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="gradient-purple-fuchsia h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-5 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">Remaining</p>
                </div>
                <p className="text-3xl font-bold text-gradient">
                  {user.subscription.monthly_limit - user.subscription.current_period_uploads}
                </p>
                <p className="text-sm text-gray-500 mt-1">jobs left</p>
              </div>
            </div>

            {currentPlan.plan_name !== 'free' && (
              <button
                onClick={handleManageBilling}
                disabled={isLoadingPortal}
                className="flex items-center gap-2 px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl font-bold hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoadingPortal ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    <ExternalLink size={18} />
                    Manage Billing Portal
                  </>
                )}
              </button>
            )}
          </div>

          {/* Usage Warning */}
          {usagePercentage >= 80 && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-300 rounded-2xl p-6 flex items-start gap-4 shadow-lg animate-fade-in-up">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-orange-900 mb-2">
                  You're running low on credits
                </h3>
                <p className="text-orange-700 mb-3">
                  You've used {Math.round(usagePercentage)}% of your monthly quota. Consider upgrading to avoid interruptions.
                </p>
                <Link
                  href="#plans"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 shadow-md"
                >
                  View upgrade options →
                </Link>
              </div>
            </div>
          )}

          {/* Available Plans */}
          <div id="plans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">Available Plans</h2>

              {/* Billing Period Toggle */}
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${billingPeriod === 'monthly'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all relative ${billingPeriod === 'yearly'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  Yearly
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {plansLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => {
                  const isCurrent = plan.id.toLowerCase() === currentPlan.plan.toLowerCase()
                  const isLoading = loadingPlanId === plan.id

                  return (
                    <div
                      key={plan.id}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all flex flex-col justify-between h-full ${plan.popular
                        ? 'border-fuchsia-300 shadow-xl relative'
                        : 'border-purple-100 shadow-lg'
                        } ${isCurrent ? 'ring-2 ring-purple-600' : ''}`}
                    >
                      {plan.popular && (
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                          <span className="px-4 py-1 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-xs font-bold rounded-full shadow-lg">
                            MOST POPULAR
                          </span>
                        </div>
                      )}

                      {isCurrent && (
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            CURRENT PLAN
                          </span>
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gradient">
                          {plan.price === 0 ? '€0' : `€${plan.price.toFixed(2)}`}
                        </span>
                        <span className="text-gray-600">
                          /{plan.period === 'year' ? 'year' : 'month'}
                        </span>
                        {plan.period === 'year' && plan.price > 0 && (
                          <div className="text-sm text-green-600 font-semibold mt-1">
                            Save 20% vs monthly
                          </div>
                        )}
                      </div>

                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleUpgrade(plan.stripePriceId, plan.id)}
                        disabled={isCurrent || loadingPlanId !== null || !plan.stripePriceId}
                        className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${isCurrent
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : plan.popular
                            ? 'gradient-purple-fuchsia text-white hover:scale-105 shadow-lg glow-purple'
                            : 'border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:scale-105 shadow-md'
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isLoading ? (
                          <>
                            <Loader className="w-5 h-5 animate-spin" />
                            Processing...
                          </>
                        ) : isCurrent ? (
                          'Current Plan'
                        ) : (
                          `Upgrade to ${plan.name}`
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Billing History (Placeholder) */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Billing History</h2>
            </div>

            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-10 h-10 text-purple-600" />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">No billing history yet</p>
              <p className="text-gray-500">
                Your invoices and payment history will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
