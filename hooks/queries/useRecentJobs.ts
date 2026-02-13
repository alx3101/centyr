'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

/**
 * React Query hook for fetching user's recent jobs
 *
 * Features:
 * - Automatic caching
 * - Automatic invalidation when new jobs are created
 * - Deduplicates calls
 * - Auto-polls when refetchInterval is set (e.g. when jobs are processing)
 */
export function useRecentJobs(limit: number = 50, refetchInterval?: number | false) {
  return useQuery({
    queryKey: ['jobs', 'recent', limit],
    queryFn: async () => {
      const response = await api.getJobs(limit)
      return response.jobs || []
    },
    staleTime: 30 * 1000, // 30 seconds - jobs list can change frequently
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    refetchInterval: refetchInterval || false,
  })
}
