'use client'

import { AuthProvider } from '@/contexts/AuthContext'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { AppShell } from '@/components/layout/AppShell'

interface AppProvidersProps {
  children: React.ReactNode
}

/**
 * AppProviders - Wrapper per tutti i context providers dell'app
 * Include anche AppShell per gestire layout globale (Navbar + Footer)
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppShell>
          {children}
        </AppShell>
      </AuthProvider>
    </LanguageProvider>
  )
}
