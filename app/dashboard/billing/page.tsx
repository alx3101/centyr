'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import Link from 'next/link'
import { CreditCard, Calendar, ExternalLink, AlertCircle, Loader } from 'lucide-react'
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

  const currentPlan = user.subscription.plan
  const usagePercentage = (user.subscription.usage / user.subscription.quota) * 100

  return (
    <div className="py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Billing & Subscription
          </h1>
          <p className="text-gray-600">
            Manage your subscription and billing information
          </p>
        </div>

        <div className="space-y-6">
          {/* Current Subscription Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Current Subscription</h2>
              </div>
              <span className="px-4 py-2 gradient-purple-fuchsia text-white text-sm font-bold rounded-full">
                {currentPlan.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Monthly Quota</p>
                <p className="text-2xl font-bold text-gray-900">{user.subscription.quota}</p>
                <p className="text-sm text-gray-500">images/month</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Used This Month</p>
                <p className="text-2xl font-bold text-gray-900">{user.subscription.usage}</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="gradient-purple-fuchsia h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Remaining</p>
                <p className="text-2xl font-bold text-gradient">
                  {user.subscription.quota - user.subscription.usage}
                </p>
                <p className="text-sm text-gray-500">images left</p>
              </div>
            </div>

            {currentPlan !== 'free' && (
              <button
                onClick={handleManageBilling}
                disabled={isLoadingPortal}
                className="flex items-center gap-2 px-6 py-3 border-2 border-purple-200 text-purple-700 rounded-lg font-semibold hover:bg-purple-50 transition-all disabled:opacity-50"
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
            <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-orange-900 mb-1">
                  You're running low on credits
                </h3>
                <p className="text-orange-700 text-sm mb-3">
                  You've used {Math.round(usagePercentage)}% of your monthly quota. Consider upgrading to avoid interruptions.
                </p>
                <Link
                  href="#plans"
                  className="text-sm font-semibold text-orange-600 hover:text-orange-700 underline"
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
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${
                    billingPeriod === 'monthly'
                      ? 'bg-white text-purple-600 shadow-md'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all relative ${
                    billingPeriod === 'yearly'
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
                  const isCurrent = plan.id.toLowerCase() === currentPlan.toLowerCase()
                  const isLoading = loadingPlanId === plan.id

                  return (
                    <div
                      key={plan.id}
                      className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 transition-all ${
                        plan.popular
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
                        className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                          isCurrent
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : plan.popular
                            ? 'gradient-purple-fuchsia text-white hover:scale-105 shadow-lg'
                            : 'border-2 border-purple-200 text-purple-700 hover:bg-purple-50'
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Billing History</h2>
            </div>

            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No billing history yet</p>
              <p className="text-sm text-gray-500">
                Your invoices and payment history will appear here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
