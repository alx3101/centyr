'use client'

import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'

/**
 * React Query hook for fetching current user data
 *
 * Features:
 * - Automatic caching (1 minute stale time)
 * - Deduplicates multiple calls to same endpoint
 * - No refetch on window focus
 * - Automatic retry on failure (1 attempt)
 */
export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.getCurrentUser(),
    staleTime: 60 * 1000, // 1 minute
    cacheTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  })
}
