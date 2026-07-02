'use client'

import { Check, Crown, Loader, X } from 'lucide-react'
import type { PricingPlan } from '@/lib/api'

interface PricingCardProps {
  plan: PricingPlan
  billingPeriod: 'month' | 'year'
  isCurrent: boolean
  isLoading: boolean
  anyLoading: boolean
  features: string[]
  description: string
  onSelect: () => void
  labels: {
    current: string
    startFree: string
    upgrade: string
    perMonth: string
    billedYearly: string
  }
  animationDelay?: number
}

export default function PricingCard({
  plan,
  billingPeriod,
  isCurrent,
  isLoading,
  anyLoading,
  features,
  description,
  onSelect,
  labels,
  animationDelay = 0,
}: PricingCardProps) {
  const isPaid = plan.price > 0
  const isDisabled = isCurrent || !isPaid

  const displayPrice = plan.price === 0
    ? '€0'
    : `€${billingPeriod === 'year' ? (plan.price / 12).toFixed(2) : plan.price.toFixed(2)}`

  const buttonLabel = isLoading ? (
    <><Loader className="w-4 h-4 animate-spin" /> ...</>
  ) : isCurrent ? labels.current
    : plan.price === 0 ? labels.startFree
    : labels.upgrade

  return (
    <div
      className={`relative rounded-2xl p-5 flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up ${
        plan.popular
          ? 'bg-gradient-to-br from-purple-50 to-fuchsia-50 border-2 border-purple-300'
          : 'bg-white border border-gray-200'
      }`}
      style={{ animationDelay: `${animationDelay}s` }}
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
            {labels.current.toUpperCase()}
          </div>
        </div>
      )}

      <h2 className="text-xs font-bold text-gray-500 tracking-wider mb-1">{plan.name.toUpperCase()}</h2>
      <p className="text-xs text-gray-500 mb-3 min-h-[32px]">{description}</p>

      <div className="mb-4">
        <span className="text-3xl font-bold text-gray-900">{displayPrice}</span>
        <span className="text-gray-500 text-sm">{labels.perMonth}</span>
        {billingPeriod === 'year' && plan.price > 0 && (
          <div className="text-xs mt-0.5 text-gray-400">
            €{plan.price.toFixed(2)} {labels.billedYearly}
          </div>
        )}
      </div>

      <ul className="space-y-2 mb-6 flex-grow">
        {features.map((feature, i) => {
          const locked = feature.startsWith('✗ ')
          const label = locked ? feature.slice(2) : feature
          return (
            <li key={i} className="flex items-start gap-1.5 text-xs">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${locked ? 'bg-gray-100' : 'bg-green-100'}`}>
                {locked
                  ? <X className="w-2.5 h-2.5 text-gray-400" />
                  : <Check className="w-2.5 h-2.5 text-green-600" />}
              </div>
              <span className={locked ? 'text-gray-400' : 'text-gray-700'}>{label}</span>
            </li>
          )
        })}
      </ul>

      <button
        onClick={onSelect}
        disabled={isDisabled || anyLoading}
        className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed ${
          plan.popular
            ? 'gradient-purple-fuchsia text-white hover:scale-105 shadow-lg'
            : isPaid
              ? 'bg-white border-2 border-purple-300 text-gray-900 hover:border-purple-400 hover:scale-105'
              : 'bg-gray-100 text-gray-500'
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  )
}
