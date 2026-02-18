'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cognitoConfirmSignUp, cognitoResendCode } from '@/lib/cognito'
import toast from 'react-hot-toast'
import { GuestGuard } from '@/components/guards/GuestGuard'
import { MailCheck } from 'lucide-react'

export function ConfirmEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await cognitoConfirmSignUp(email, code.trim())
      if (result.success) {
        toast.success('Email confirmed! You can now sign in.')
        router.push('/login')
      } else {
        toast.error(result.error || 'Confirmation failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    if (!email) {
      toast.error('Email not found. Please sign up again.')
      return
    }

    setIsResending(true)
    try {
      const result = await cognitoResendCode(email)
      if (result.success) {
        toast.success('Code resent! Check your email.')
      } else {
        toast.error(result.error || 'Failed to resend code')
      }
    } finally {
      setIsResending(false)
    }
  }

  return (
    <GuestGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-md w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-purple-100 relative z-10 animate-scale-in">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-4">
              Centyr
            </Link>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
              <MailCheck className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify your email</h1>
            <p className="text-gray-600 text-sm">
              We sent a verification code to{' '}
              <span className="font-semibold text-gray-800">{email || 'your email'}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors text-center tracking-widest text-lg font-mono"
                placeholder="123456"
                maxLength={8}
                autoComplete="one-time-code"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-purple-fuchsia text-white py-3 px-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Verifying...' : 'Confirm Email'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Didn't receive a code?{' '}
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-purple-600 hover:text-fuchsia-600 font-semibold disabled:opacity-50"
              >
                {isResending ? 'Sending...' : 'Resend code'}
              </button>
            </p>
            <p className="text-sm text-gray-500">
              Wrong email?{' '}
              <Link href="/signup" className="text-purple-600 hover:text-fuchsia-600 font-semibold">
                Sign up again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GuestGuard>
  )
}
