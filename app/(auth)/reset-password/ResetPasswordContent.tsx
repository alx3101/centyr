'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { cognitoConfirmPassword } from '@/lib/cognito'
import toast from 'react-hot-toast'
import { GuestGuard } from '@/components/guards/GuestGuard'
import { KeyRound, ArrowLeft } from 'lucide-react'

export function ResetPasswordContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''

  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setIsLoading(true)

    try {
      const result = await cognitoConfirmPassword(email, code, newPassword)
      if (result.success) {
        toast.success('Password reset successfully! Please sign in.')
        router.push('/login')
      } else {
        toast.error(result.error || 'Password reset failed')
      }
    } finally {
      setIsLoading(false)
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
              <KeyRound className="w-8 h-8 text-purple-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            {email && (
              <p className="text-gray-600 text-sm">
                Enter the code sent to <span className="font-semibold text-gray-800">{email}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="code" className="block text-sm font-semibold text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                id="code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.trim())}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors text-center tracking-widest text-lg font-mono"
                placeholder="123456"
                maxLength={8}
              />
            </div>

            <div>
              <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-purple-fuchsia text-white py-3 px-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <p className="text-sm text-gray-600">
              Didn't receive a code?{' '}
              <Link href="/forgot-password" className="text-purple-600 hover:text-fuchsia-600 font-semibold">
                Request again
              </Link>
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-purple-600 font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </GuestGuard>
  )
}
