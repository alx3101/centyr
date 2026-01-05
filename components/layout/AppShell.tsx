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

  // Nascondi footer su queste pagine
  const hideFooter =
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/upload') ||
    pathname?.startsWith('/billing')

  return (
    <>
      <UnifiedNavbar />
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </>
  )
}
