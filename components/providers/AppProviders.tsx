'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { ConfirmProvider } from '@/components/ui/ConfirmModal'
import { AppShell } from '@/components/layout/AppShell'

interface AppProvidersProps {
  children: React.ReactNode
  initialLanguage?: 'en' | 'it'
}

export function AppProviders({ children, initialLanguage = 'en' }: AppProvidersProps) {
  // Create QueryClient inside component to avoid SSR issues
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,         // 1 minuto
            refetchOnWindowFocus: false,  // Non refetch quando focus cambia
            retry: 1,                      // Ritenta una volta
            // cacheTime NON è più supportato qui
          },
        },
      })
  )



  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider initialLanguage={initialLanguage}>
        <AuthProvider>
          <ConfirmProvider>
            <AppShell>
              {children}
            </AppShell>
          </ConfirmProvider>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}
