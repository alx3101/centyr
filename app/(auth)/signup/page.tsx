'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-hot-toast'
import { cognitoOAuthSignIn } from '@/lib/cognito'
import { GuestGuard } from '@/components/guards/GuestGuard'
import { Check, Zap, Clock } from 'lucide-react'
import { useTranslations } from '@/contexts/LanguageContext'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { signup, isLoading } = useAuth()
  const t = useTranslations()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error(t.auth.passwordMismatch)
      return
    }

    if (formData.password.length < 8) {
      toast.error(t.auth.passwordTooShort)
      return
    }

    await signup(formData.email, formData.password, formData.fullName)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleOAuthSignup = (provider: 'Google') => {
    cognitoOAuthSignIn(provider)
  }

  return (
    <GuestGuard>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-5xl w-full flex flex-col lg:flex-row gap-8 relative z-10">
          {/* Value Sidebar - Hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex lg:w-96 flex-col justify-center animate-fade-in-up">
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl p-8 text-white shadow-2xl">
              <h2 className="text-2xl font-bold mb-6">{t.auth.whyChoose}</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t.auth.instantProcessing}</h3>
                    <p className="text-purple-100 text-sm">{t.auth.instantProcessingDesc}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{t.auth.saveHours}</h3>
                    <p className="text-purple-100 text-sm">{t.auth.saveHoursDesc}</p>
                  </div>
                </div>
              </div>

              {/* Features list */}
              <div className="mt-8 pt-6 border-t border-white/20 space-y-2">
                {[t.auth.freeJobsBadge, t.auth.noCreditCard, t.auth.setupIn60].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-300" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Signup Form */}
          <div className="flex-1 max-w-md mx-auto lg:mx-0 w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border-2 border-purple-100 animate-scale-in">
          <div className="text-center mb-8">
            <Link href="/" className="text-3xl font-bold text-gradient inline-block mb-2">
              Centyr
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.auth.signupButton}</h1>
            <p className="text-gray-600">{t.auth.signupSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.common.fullName}
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.auth.emailAddress}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.common.password}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
              <p className="text-xs text-gray-500 mt-1">{t.auth.mustBe8Chars}</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.auth.confirmPassword}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-fuchsia-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-start">
              <input
                type="checkbox"
                required
                className="w-4 h-4 mt-1 text-primary-600 border-gray-300 rounded focus:ring-fuchsia-500"
              />
              <label className="ml-2 text-sm text-gray-600">
                {t.auth.agreeToTerms}{' '}
                <Link href="/terms" className="text-primary-600 hover:text-fuchsia-600 font-semibold">
                  {t.auth.termsOfService}
                </Link>{' '}
                {t.auth.and}{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-fuchsia-600 font-semibold">
                  {t.auth.privacyPolicy}
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-purple-fuchsia text-white py-3 px-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? t.auth.creatingAccount : t.auth.signupButton}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-gray-500">{t.auth.orContinueWith}</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div>
            <button
              type="button"
              onClick={() => handleOAuthSignup('Google')}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span className="font-semibold text-gray-700">Google</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t.auth.hasAccount}{' '}
              <Link href="/login" className="text-primary-600 hover:text-fuchsia-600 font-bold transition-colors">
                {t.auth.signIn}
              </Link>
            </p>
          </div>

          {/* Free trial badge - shown on mobile only */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-2 border-fuchsia-200 rounded-xl p-4 text-center lg:hidden">
            <p className="text-sm font-semibold text-gray-900">
              {t.auth.startFreeJobsBadge}
            </p>
            <p className="text-xs text-gray-600 mt-1">{t.auth.noCreditCard}</p>
          </div>
        </div>
        </div>
      </div>
    </GuestGuard>
  )
}
