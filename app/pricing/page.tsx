'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Zap, Crown, Loader } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import { api } from '@/lib/api'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

export default function PricingPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)
  const { plans: pricingPlans, isLoading: plansLoading } = usePricingPlans()

  // Show loading skeleton while fetching plans
  if (plansLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600">Loading plans...</p>
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
      toast.error('Please login first')
      router.push('/login')
      return
    }

    setLoadingPlanId(planId)
    try {
      const checkout = await api.createCheckoutSession({
        price_id: stripePriceId,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/pricing`,
      })

      // Redirect to Stripe Checkout
      window.location.href = checkout.checkout_url
    } catch (error: any) {
      toast.error(error.message || 'Failed to start checkout')
      setLoadingPlanId(null)
    }
  }

  // Format plans for UI
  const plans = pricingPlans.map(plan => ({
    name: plan.name,
    price: plan.price === 0 ? '€0' : `€${plan.price.toFixed(2)}`,
    period: `/${plan.period}`,
    description: plan.description,
    features: plan.features,
    cta: plan.price === 0 ? 'Current Plan' : `Upgrade to ${plan.name}`,
    popular: plan.popular,
    current: user?.subscription?.plan_name === plan.id,
    disabled: user?.subscription?.plan === plan.id || plan.price === 0,
    stripePriceId: plan.stripe_price_id,
    planId: plan.id
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your business needs. No hidden fees.
          </p>
        </div>

        {/* Current Plan Info */}
        {isAuthenticated && user && (
          <div className="bg-gradient-to-r from-purple-100 to-fuchsia-100 border-2 border-purple-200 rounded-xl p-6 mb-12 animate-fade-in-up">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Current Plan: {user.subscription.plan.toUpperCase()}</h3>
                <p className="text-gray-600">
                  {user.subscription.current_period_uploads} / {user.subscription.monthly_limit} jobs used this month
                </p>
              </div>
              <div className="w-full md:w-64 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-600 to-fuchsia-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${(user.subscription.current_period_uploads / user.subscription.monthly_limit) * 100}%` }}
                />
              </div>
              {user.subscription.plan === 'premium' && (
                <Link
                  href="/billing"
                  className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                >
                  Manage Subscription
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`
                relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2
                ${plan.popular
                  ? 'border-fuchsia-400 shadow-2xl scale-105'
                  : 'border-purple-200 shadow-xl'
                }
                animate-fade-in-up
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Crown className="w-4 h-4" />
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Current Plan Badge */}
              {plan.current && (
                <div className="absolute top-4 right-4">
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                    CURRENT
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={() => handleUpgrade(plan.stripePriceId, plan.planId)}
                disabled={plan.disabled || loadingPlanId !== null}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                  ${plan.popular
                    ? 'gradient-purple-fuchsia text-white hover:scale-105 shadow-lg glow-purple'
                    : 'bg-gray-100 text-gray-400'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center justify-center gap-2
                `}
              >
                {loadingPlanId === plan.planId ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {plan.popular && <Zap className="w-5 h-5" />}
                    {plan.cta}
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                What happens if I exceed my quota?
              </h3>
              <p className="text-gray-600">
                You'll need to wait until next month or upgrade to Premium for more images. We'll notify you when you're close to your limit.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-100">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-12">
          <Link href="/" className="text-purple-600 hover:text-fuchsia-600 font-semibold">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
