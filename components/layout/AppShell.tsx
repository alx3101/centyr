'use client'

import { usePathname } from 'next/navigation'
import { UnifiedNavbar } from './UnifiedNavbar'
import Footer from '@/components/marketing/Footer'

interface AppShellProps {
  children: React.ReactNode
}

/**
 * AppShell - Layout wrapper che gestisce Navbar e Footer
 * Nasconde il footer nelle pagine di auth e dashboard
 */
export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()

  const isAuthPage =
    !pathname ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/forgot-password') ||
    pathname.startsWith('/reset-password')

  // Nascondi footer su queste pagine
  const hideFooter =
    isAuthPage ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/upload') ||
    pathname?.startsWith('/billing')

  return (
    <>
      {!isAuthPage && <UnifiedNavbar />}
      <main className="overflow-x-hidden">{children}</main>
      {!hideFooter && <Footer />}
    </>
  )
}
