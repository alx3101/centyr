'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { CreditCard, Calendar, Zap, AlertCircle, ExternalLink, Loader } from 'lucide-react'
import toast from 'react-hot-toast'
import { useConfirm } from '@/components/ui/ConfirmModal'

export default function BillingPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const confirm = useConfirm()
  const [loading, setLoading] = useState(false)
  const [cancelLoading, setCancelLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, authLoading, router])

  const handleOpenCustomerPortal = async () => {
    setLoading(true)
    try {
      const portal = await api.createCustomerPortal({
        return_url: `${window.location.origin}/billing`,
      })

      // Open Stripe Customer Portal
      window.location.href = portal.portal_url
    } catch (error: any) {
      if (error.message.includes('404')) {
        toast.error('No active subscription found')
      } else {
        toast.error('Failed to open customer portal')
      }
      setLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    const confirmed = await confirm({
      title: 'Cancel Subscription',
      message: 'Are you sure you want to cancel your subscription? It will remain active until the end of the current billing period.',
      confirmText: 'Yes, cancel',
      cancelText: 'No, keep it',
      variant: 'destructive'
    })

    if (!confirmed) return

    setCancelLoading(true)
    try {
      await api.cancelSubscription(false) // Cancel at period end

      toast.success('Subscription cancelled. You can continue using Premium until the end of this billing period.')

      // Refresh user data
      window.location.reload()
    } catch (error: any) {
      toast.error(error.message || 'Failed to cancel subscription')
      setCancelLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    )
  }

  if (!user) return null

  const isPremium = user.subscription.plan_name === 'premium'
  const usagePercentage = (user.subscription.current_period_uploads / user.subscription.monthly_limit) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your plan and payment methods</p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white rounded-2xl shadow-xl p-5 md:p-8 border-2 border-purple-200 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {isPremium ? 'Premium Plan' : 'Free Plan'}
              </h2>
              <p className="text-gray-600">
                {isPremium ? '€19.99/month' : '€0/month'}
              </p>
            </div>
            {isPremium && (
              <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white px-4 py-2 rounded-full font-bold flex items-center gap-2">
                <Zap className="w-4 h-4" />
                PREMIUM
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">Monthly Usage</span>
              <span className="text-sm font-semibold text-gray-900">
                {user.subscription.current_period_uploads} / {user.subscription.monthly_limit} jobs
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${usagePercentage > 90
                    ? 'bg-gradient-to-r from-red-500 to-orange-500'
                    : 'bg-gradient-to-r from-purple-600 to-fuchsia-600'
                  }`}
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
            {usagePercentage > 90 && (
              <div className="flex items-center gap-2 mt-2 text-orange-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>You're almost at your monthly limit!</span>
              </div>
            )}
          </div>

          {/* Plan Features */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Your Plan Includes:</h3>
            <ul className="space-y-2">
              {isPremium ? (
                <>
                  <li className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    500 jobs/month
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    API access
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    3 jobs/month
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    Standard processing
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!isPremium && (
              <button
                onClick={() => router.push('/pricing')}
                className="flex-1 gradient-purple-fuchsia text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                Upgrade to Premium
              </button>
            )}

            {isPremium && (
              <>
                <button
                  onClick={handleOpenCustomerPortal}
                  disabled={loading}
                  className="flex-1 bg-purple-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Manage Payment
                      <ExternalLink className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  onClick={handleCancelSubscription}
                  disabled={cancelLoading}
                  className="flex-1 sm:flex-none bg-white border-2 border-red-300 text-red-600 py-3 px-6 rounded-xl font-bold hover:bg-red-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {cancelLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5" />
                      Cancel Subscription
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
            <Calendar className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Billing Cycle</h3>
            <p className="text-gray-600 text-sm">
              Your plan renews monthly. You can cancel anytime and continue using Premium until the end of your billing period.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border-2 border-purple-100">
            <CreditCard className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-bold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600 text-sm">
              All payments are processed securely through Stripe. We never store your payment information.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-purple-600 hover:text-fuchsia-600 font-semibold"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
