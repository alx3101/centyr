'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

export default function BillingSuccessPage() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // Refresh user data to get updated subscription
    refreshUser?.()

    // Confetti animation (you can add a library like canvas-confetti)
    // confetti()

    // Countdown redirect to dashboard
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          router.push('/dashboard')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router, refreshUser])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 text-center border-2 border-green-200">
          {/* Success Icon */}
          <div className="mb-6 inline-flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-4">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>

          {/* Sparkles decoration */}
          <div className="flex justify-center gap-4 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0s' }} />
            <Sparkles className="w-8 h-8 text-yellow-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Sparkles className="w-6 h-6 text-yellow-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Premium! 🎉
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-8">
            Your subscription is now active. Get ready to unlock all premium features!
          </p>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8">
            <h2 className="font-bold text-gray-900 mb-4">What you get:</h2>
            <ul className="space-y-3 text-left max-w-md mx-auto">
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">500 jobs per month</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Priority processing speed</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Advanced alignment tools</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">API access</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Priority support</span>
              </li>
            </ul>
          </div>

          {/* Auto redirect notice */}
          <p className="text-sm text-gray-500 mb-6">
            Redirecting to dashboard in {countdown} seconds...
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-green-600 text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition-all"
            >
              Start Uploading
            </Link>
          </div>

          {/* Receipt notice */}
          <p className="text-sm text-gray-500 mt-8">
            A receipt has been sent to your email. You can manage your subscription anytime from your{' '}
            <Link href="/dashboard/billing" className="text-green-600 hover:underline font-semibold">
              billing settings
            </Link>
            .
          </p>
        </div>

        {/* Support link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help?{' '}
            <Link href="/support" className="text-green-600 hover:underline font-semibold">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
