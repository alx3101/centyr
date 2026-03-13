'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { usePricingPlans } from '@/hooks/usePricingPlans'
import Link from 'next/link'
import { CreditCard, Calendar, ExternalLink, AlertCircle, Loader, Sparkles, Zap, TrendingUp, FileText, ArrowUp, ArrowDown, X, Wallet } from 'lucide-react'
import toast from 'react-hot-toast'
import { api, Invoice } from '@/lib/api'
import { useTranslations } from '@/contexts/LanguageContext'

type PendingPlan = {
  name: string
  price: number
  priceId: string
  planId: string
  isUpgrade: boolean
}

export default function BillingPage() {
  const { user } = useAuth()
  const t = useTranslations()
  const [isLoadingPortal, setIsLoadingPortal] = useState(false)
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const { plans: pricingPlans, isLoading: plansLoading } = usePricingPlans()
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [invoicesLoading, setInvoicesLoading] = useState(true)
  const [pendingPlan, setPendingPlan] = useState<PendingPlan | null>(null)

  useEffect(() => {
    api.getInvoices()
      .then(r => setInvoices(r.invoices))
      .catch(() => {})
      .finally(() => setInvoicesLoading(false))
  }, [])

  const handleUpgrade = (stripePriceId: string | null, planId: string, planName: string, planPrice: number) => {
    if (!stripePriceId) {
      toast.error(t.billing.cannotPurchase)
      return
    }
    // Determine upgrade vs downgrade by comparing prices
    const currentPlanPrice = pricingPlans.find(p => p.id.toLowerCase() === user?.subscription?.plan?.toLowerCase())?.price ?? 0
    const isUpgrade = planPrice > currentPlanPrice
    setPendingPlan({ name: planName, price: planPrice, priceId: stripePriceId, planId, isUpgrade })
  }

  const confirmUpgrade = async () => {
    if (!pendingPlan) return
    setLoadingPlanId(pendingPlan.planId)
    setPendingPlan(null)
    try {
      const checkout = await api.createCheckoutSession({
        price_id: pendingPlan.priceId,
        success_url: `${window.location.origin}/billing/success`,
        cancel_url: `${window.location.origin}/dashboard/billing`,
      })
      window.location.href = checkout.checkout_url
    } catch (error: any) {
      toast.error(error.message || t.billing.failedCheckout)
      setLoadingPlanId(null)
    }
  }

  const handleManageBilling = async () => {
    setIsLoadingPortal(true)
    try {
      const response = await api.createCustomerPortal({ return_url: window.location.href })
      window.location.href = response.portal_url
    } catch (error: any) {
      toast.error(error.message || t.billing.failedPortal)
      setIsLoadingPortal(false)
    }
  }

  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const handleUpdatePayment = async () => {
    setIsLoadingPayment(true)
    try {
      const response = await api.createCustomerPortal({
        return_url: window.location.href,
        flow: 'payment_method_update',
      })
      window.location.href = response.portal_url
    } catch (error: any) {
      toast.error(error.message || t.billing.failedPortal)
      setIsLoadingPayment(false)
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
            <span className="text-sm font-semibold text-gray-700">{t.billing.subscriptionManagement}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">{t.billing.title}</span>
          </h1>
          <p className="text-lg text-gray-600">
            {t.billing.subtitle}
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
                <h2 className="text-2xl font-bold text-gray-900">{t.billing.currentSubscription}</h2>
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
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{t.billing.monthlyQuota}</p>
                </div>
                <p className="text-3xl font-bold text-gray-900">{user.subscription.monthly_limit}</p>
                <p className="text-sm text-gray-500 mt-1">{t.billing.jobsPerMonth}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-5 border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-md">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{t.billing.usedThisMonth}</p>
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
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider">{t.billing.remaining}</p>
                </div>
                <p className="text-3xl font-bold text-gradient">
                  {user.subscription.monthly_limit - user.subscription.current_period_uploads}
                </p>
                <p className="text-sm text-gray-500 mt-1">{t.billing.jobsLeft}</p>
              </div>
            </div>

            {currentPlan.plan !== 'free' && (
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleManageBilling}
                  disabled={isLoadingPortal}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-purple-300 text-purple-700 rounded-xl font-bold hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingPortal ? (
                    <><Loader className="w-5 h-5 animate-spin" />{t.billing.opening}</>
                  ) : (
                    <><ExternalLink size={18} />{t.billing.manageBillingPortal}</>
                  )}
                </button>

                <button
                  onClick={handleUpdatePayment}
                  disabled={isLoadingPayment}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:scale-105 transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingPayment ? (
                    <><Loader className="w-5 h-5 animate-spin" />{t.billing.opening}</>
                  ) : (
                    <><Wallet size={18} />{t.billing.updatePaymentMethod}</>
                  )}
                </button>
              </div>
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
                  {t.billing.runningLow}
                </h3>
                <p className="text-orange-700 mb-3">
                  {t.billing.runningLowDesc.replace('{percentage}', String(Math.round(usagePercentage)))}
                </p>
                <Link
                  href="#plans"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 hover:scale-105 transition-all duration-300 shadow-md"
                >
                  {t.billing.viewUpgradeOptions}
                </Link>
              </div>
            </div>
          )}

          {/* Available Plans */}
          <div id="plans">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h2 className="text-2xl font-bold text-gray-900">{t.billing.availablePlans}</h2>

              {/* Billing Period Toggle */}
              <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setBillingPeriod('monthly')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all ${billingPeriod === 'monthly'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {t.billing.monthly}
                </button>
                <button
                  onClick={() => setBillingPeriod('yearly')}
                  className={`px-4 py-2 rounded-md font-semibold text-sm transition-all relative ${billingPeriod === 'yearly'
                    ? 'bg-white text-purple-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {t.billing.yearly}
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
                            {t.billing.mostPopular}
                          </span>
                        </div>
                      )}

                      {isCurrent && (
                        <div className="mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            {t.billing.currentPlanBadge}
                          </span>
                        </div>
                      )}

                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>

                      <div className="mb-6">
                        <span className="text-4xl font-bold text-gradient">
                          {plan.price === 0 ? '€0' : `€${plan.price.toFixed(2)}`}
                        </span>
                        <span className="text-gray-600">
                          {plan.period === 'year' ? t.billing.perYear : t.billing.perMonth}
                        </span>
                        {plan.period === 'year' && plan.price > 0 && (
                          <div className="text-sm text-green-600 font-semibold mt-1">
                            {t.billing.save20}
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
                        onClick={() => handleUpgrade(plan.stripePriceId, plan.id, plan.name, plan.price)}
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
                            {t.billing.processingBtn}
                          </>
                        ) : isCurrent ? (
                          t.billing.currentPlanBtn
                        ) : (
                          `${t.billing.upgradeTo} ${plan.name}`
                        )}
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Billing History */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 border-2 border-purple-100 shadow-lg hover:shadow-xl transition-all">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{t.billing.billingHistory}</h2>
            </div>

            {invoicesLoading ? (
              <div className="flex justify-center py-8">
                <Loader className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            ) : invoices.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-purple-600" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">{t.billing.noBillingHistory}</p>
                <p className="text-gray-500">{t.billing.billingHistoryDesc}</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {invoices.map(inv => {
                  const statusLabel = inv.status === 'paid' ? t.billing.invoiceStatusPaid
                    : inv.status === 'refund' ? t.billing.invoiceStatusRefund
                    : inv.status === 'void' ? t.billing.invoiceStatusVoid
                    : t.billing.invoiceStatusOpen
                  const statusColor = inv.status === 'paid' ? 'bg-green-100 text-green-700'
                    : inv.status === 'refund' ? 'bg-blue-100 text-blue-700'
                    : inv.status === 'void' ? 'bg-gray-100 text-gray-500'
                    : 'bg-yellow-100 text-yellow-700'
                  const isRefund = inv.type === 'refund'
                  return (
                    <div key={inv.id} className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isRefund ? 'bg-blue-100' : 'bg-purple-100'}`}>
                          <FileText className={`w-4 h-4 ${isRefund ? 'text-blue-600' : 'text-purple-600'}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {new Date(inv.created * 1000).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            {isRefund ? t.billing.invoiceTypeRefund : t.billing.invoiceTypeInvoice}
                            {inv.number ? ` · ${inv.number}` : ''}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`font-bold ${isRefund ? 'text-blue-600' : 'text-gray-900'}`}>
                          {isRefund ? '-' : ''}{(inv.amount / 100).toFixed(2)} {inv.currency.toUpperCase()}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor}`}>
                          {statusLabel}
                        </span>
                        {inv.pdf_url && (
                          <a href={inv.pdf_url} target="_blank" rel="noopener noreferrer" title={t.billing.downloadInvoice} className="text-purple-600 hover:text-fuchsia-600">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {pendingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setPendingPlan(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
            <button onClick={() => setPendingPlan(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>

            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${pendingPlan.isUpgrade ? 'bg-indigo-100' : 'bg-orange-100'}`}>
              {pendingPlan.isUpgrade
                ? <ArrowUp className="w-6 h-6 text-indigo-600" />
                : <ArrowDown className="w-6 h-6 text-orange-600" />}
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {pendingPlan.isUpgrade ? `Passa a ${pendingPlan.name}` : `Passa a ${pendingPlan.name}`}
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              {pendingPlan.isUpgrade
                ? `La differenza proporzionale ai giorni rimanenti del periodo verrà addebitata subito. Il rinnovo mensile sarà €${pendingPlan.price.toFixed(2)}.`
                : `Il tuo piano rimarrà attivo fino alla fine del periodo corrente, poi passerà a ${pendingPlan.name} (€${pendingPlan.price.toFixed(2)}/mese). Nessun addebito immediato.`}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setPendingPlan(null)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={confirmUpgrade}
                className={`flex-1 px-4 py-2.5 text-white rounded-xl font-semibold text-sm transition-colors ${pendingPlan.isUpgrade ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-orange-500 hover:bg-orange-600'}`}
              >
                Conferma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
