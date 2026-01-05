'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Loader } from '@/components/ui/Loader'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * AuthGuard - Protegge le route che richiedono autenticazione
 * Reindirizza a /login se l'utente non è autenticato
 * Mostra loader durante il check iniziale per evitare flash di contenuto
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Solo se il loading è finito e l'utente non è autenticato
    if (!isLoading && !isAuthenticated) {
      // Salva la URL corrente per tornare dopo il login
      const returnUrl = encodeURIComponent(pathname)
      // Usa replace per evitare loop nel back button
      router.replace(`/login?returnUrl=${returnUrl}`)
    }
  }, [isLoading, isAuthenticated, router, pathname])

  // Durante il caricamento, mostra fallback o loader di default
  if (isLoading) {
    return fallback || <Loader variant="fullscreen" text="Verifying authentication..." />
  }

  // Se non autenticato, mostra loader (sta per fare redirect)
  if (!isAuthenticated) {
    return <Loader variant="fullscreen" text="Redirecting to login..." />
  }

  // Utente autenticato, mostra contenuto
  return <>{children}</>
}
