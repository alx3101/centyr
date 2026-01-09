'use client'
import Link from 'next/link'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { UserInfo } from '@/lib/api'
import { User } from '@supabase/supabase-js'

export default function Navbar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentJobId = searchParams?.get('job')

  const [user, setUser] = useState<UserInfo | null>(null)


  useEffect(() => {
    loadUser()
  }, [])


  const loadUser = () => {
    const userData = localStorage.getItem('user')

    console.log("userData raw:", userData)

    if (userData) {
      const parsedUser = JSON.parse(userData)
      console.log("parsed user:", parsedUser)
      console.log("monthly_limit:", parsedUser?.monthly_limit)

      setUser(parsedUser)
    }
  }

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-2xl font-bold text-gradient hover:scale-105 transition-transform">
            Centyr
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-fuchsia-600 transition-colors relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-fuchsia group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-fuchsia-600 transition-colors relative group">
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-fuchsia group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#testimonials" className="text-gray-600 hover:text-fuchsia-600 transition-colors relative group">
              Testimonials
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-purple-fuchsia group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>

                <button
                  onClick={() => router.push('/dashboard')}
                  className="text-gray-600 hover:text-fuchsia-600 transition-colors hidden sm:block"
                >
                  Dashboard
                </button>

                <span className="text-sm text-gray-500 hidden sm:block">
                  {user.email}
                </span>
              </>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-600 hover:text-fuchsia-600 transition-colors hidden sm:block"
                >
                  Sign In
                </Link>

                <Link
                  href="/upload"
                  className="gradient-purple-fuchsia text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 hover:glow-purple transition-all duration-300"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}
