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
      const response = await api.getPricingPlans()
      setPlans(response.plans)
    } catch (err: any) {
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
          features: ['10 jobs/month', 'Up to 5 images per batch', 'Uniform alignment & centering', 'Background removal', '7-day storage', 'Email support'],
          popular: false,
          monthly_limit: 10,
          metadata: {}
        },
        {
          id: 'starter',
          name: 'Starter',
          description: 'For catalogs that need consistency',
          price: 12.99,
          currency: 'EUR',
          period: 'month',
          stripe_price_id: null,
          stripe_product_id: 'starter',
          features: ['60 jobs/month', 'Up to 25 images per batch', 'Uniform alignment & centering', 'Product shadows', '1 marketplace preset', '30-day storage'],
          popular: false,
          monthly_limit: 60,
          metadata: {}
        },
        {
          id: 'pro',
          name: 'Pro',
          description: 'For professionals & agencies',
          price: 39.99,
          currency: 'EUR',
          period: 'month',
          stripe_price_id: null,
          stripe_product_id: 'pro',
          features: ['200 jobs/month', 'Up to 100 images per batch', 'All marketplace presets', 'Batch exposure normalization', 'Priority processing', '90-day storage'],
          popular: true,
          monthly_limit: 200,
          metadata: {}
        },
        {
          id: 'business',
          name: 'Business',
          description: 'For high-volume teams',
          price: 129,
          currency: 'EUR',
          period: 'month',
          stripe_price_id: null,
          stripe_product_id: 'business',
          features: ['500 jobs/month', 'Up to 100 images per batch', 'All features included', '180-day storage', '24/7 priority support'],
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
