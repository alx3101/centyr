'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader } from '@/components/ui/Loader'

interface GuestGuardProps {
  children: React.ReactNode
  redirectTo?: string
}

/**
 * GuestGuard - Protegge le route accessibili solo a utenti NON autenticati
 * (es. login, signup)
 * Reindirizza a /dashboard se l'utente è già autenticato
 * Previene il flash del form di login quando l'utente è già loggato
 */
export function GuestGuard({ children, redirectTo = '/dashboard' }: GuestGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Solo se il loading è finito e l'utente è autenticato
    if (!isLoading && isAuthenticated) {
      // Usa replace per evitare loop nel back button
      router.replace(redirectTo)
    }
  }, [isLoading, isAuthenticated, router, redirectTo])

  // Durante il caricamento, mostra loader
  if (isLoading) {
    return <Loader variant="fullscreen" text="Loading..." />
  }

  // Se autenticato, mostra loader (sta per fare redirect)
  if (isAuthenticated) {
    return <Loader variant="fullscreen" text="Redirecting..." />
  }

  // Utente non autenticato, mostra contenuto (form login/signup)
  return <>{children}</>
}
