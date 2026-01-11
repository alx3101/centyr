'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

const HARDCODED_FALLBACK = [
  {
    stripe_product_id: 'free',
    name: 'Free',
    monthly_limit: 50,
    price: 0,
    currency: 'EUR',
    period: 'month',
    features: ['50 images/month', 'Basic alignment', 'Email support'],
    popular: false,
  },
  {
    stripe_product_id: 'premium',
    name: 'Premium',
    monthly_limit: 1000,
    price: 29,
    currency: 'EUR',
    period: 'month',
    features: [
      '1,000 images/month',
      'Advanced alignment',
      'Priority processing',
      'Priority support',
    ],
    popular: true,
  },
]

/**
 * React Query hook for fetching pricing plans
 *
 * Features:
 * - Long cache time (plans don't change often)
 * - Fallback to hardcoded plans if API fails
 * - Deduplicates calls across the app
 */
export function usePricingPlans() {
  return useQuery({
    queryKey: ['pricingPlans'],
    queryFn: async () => {
      try {
        const plans = await api.getPricingPlans()
        return plans && plans.length > 0 ? plans : HARDCODED_FALLBACK
      } catch (error) {
        console.warn('[usePricingPlans] API failed, using hardcoded fallback')
        return HARDCODED_FALLBACK
      }
    },
    staleTime: 60 * 60 * 1000, // 1 hour - pricing rarely changes
    cacheTime: 24 * 60 * 60 * 1000, // 24 hours
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
