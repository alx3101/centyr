import { useState, useEffect, useCallback } from 'react'
import { api, PricingPlan } from '@/lib/api'

/**
 * Hook to fetch pricing plans from backend (which fetches from Stripe)
 *
 * Plans are cached in the component state to avoid repeated API calls.
 * Refetch manually if needed.
 */
export function usePricingPlans() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPlans = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('Fetching pricing plans...')
      const response = await api.getPricingPlans()
      console.log('Pricing plans response:', response)
      setPlans(response.plans)
    } catch (err: any) {
      console.error('Failed to fetch pricing plans:', err)
      console.error('Error details:', err.response || err.message)
      setError(err.message || 'Failed to load pricing plans')

      // Fallback to hardcoded plans if API fails
      setPlans([
        {
          id: 'free',
          name: 'Free',
          description: 'Perfect for testing',
          price: 0,
          currency: 'EUR',
          period: 'month',
          stripe_price_id: null,
          stripe_product_id: 'free',
          features: ['10 images/month', 'Standard processing', 'Email support'],
          popular: false,
          monthly_limit: 10,
          metadata: {}
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For professionals',
          price: 9.99,
          currency: 'EUR',
          period: 'month',
          stripe_price_id: null,
          stripe_product_id: 'pro',
          features: ['100 images/month', 'Advanced processing', 'Priority support', 'API access'],
          popular: true,
          monthly_limit: 100,
          metadata: {}
        },
        {
          id: 'business',
          name: 'Business',
          description: 'For teams',
          price: 29.99,
          currency: 'EUR',
          period: 'month',
          stripe_price_id: null,
          stripe_product_id: 'business',
          features: ['500 images/month', 'Batch processing', '24/7 support', 'Custom API limits', 'Team features'],
          popular: false,
          monthly_limit: 500,
          metadata: {}
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  return {
    plans,
    isLoading,
    error,
    refetch: fetchPlans
  }
}
