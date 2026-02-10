'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut, LayoutDashboard, Upload, User, Menu, X, Home } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import Image from 'next/image'

export function UnifiedNavbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Non mostrare navbar su pagine di login/signup
  const isAuthPage = pathname?.startsWith('/login') || pathname?.startsWith('/signup')
  if (isAuthPage) {
    return null
  }

  // Durante il loading iniziale, mostra una navbar placeholder per evitare flash
  if (isLoading) {
    return (
      <nav className="bg-white/80 backdrop-blur-md py-4 border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Image
              src="/logo.svg"
              alt="Centyr logo"
              width={150}
              height={90}
              priority
            />
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  // Links per utenti autenticati
  const authenticatedLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/upload', label: 'Upload', icon: Upload },
  ]

  // Links pubblici (marketing)
  const publicLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Testimonials' },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md py-3 border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="inline-flex items-center hover:scale-105 transition-transform"
          >
            <Image
              src="/logo.svg"
              alt="Centyr logo"
              width={150}
              height={90}
              priority
            />

          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              // Se loggato: mostra SEMPRE Dashboard e Upload
              <>
                {authenticatedLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                        ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
                        : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
                        }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  )
                })}
              </>
            ) : (
              // Se NON loggato: mostra links pubblici
              <>
                {publicLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-gray-600 hover:text-fuchsia-600 transition-colors relative group font-medium"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </>
            )}
          </div>

          {/* Right Side - Auth buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                {/* User info - only on desktop */}
                <div className="hidden sm:flex items-center space-x-3 px-4 border-l border-purple-200">
                  <User size={18} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-700">
                    {user.email.split('@')[0]}
                  </span>
                </div>

                {/* Logout button */}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span className="hidden sm:inline font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-fuchsia-600 transition-colors hidden sm:block font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="gradient-purple-fuchsia text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-purple-100 animate-fade-in-up">
            <div className="flex flex-col space-y-2">
              {isAuthenticated ? (
                // Se loggato: mostra Dashboard, Upload e info utente
                <>
                  {authenticatedLinks.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive
                          ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white'
                          : 'text-gray-700 hover:bg-purple-50'
                          }`}
                      >
                        <Icon size={20} />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    )
                  })}
                  {user && (
                    <div className="px-4 py-3 bg-purple-50 rounded-lg mt-2">
                      <p className="text-sm text-gray-600">Signed in as</p>
                      <p className="font-medium text-gray-900">{user.email}</p>
                    </div>
                  )}
                </>
              ) : (
                // Se NON loggato: mostra links pubblici e auth
                <>
                  {publicLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-all font-medium"
                    >
                      {link.label}
                    </a>
                  ))}
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 text-gray-700 hover:bg-purple-50 rounded-lg transition-all font-medium"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 gradient-purple-fuchsia text-white rounded-lg font-semibold text-center"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
