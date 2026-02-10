'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { toast } from 'react-hot-toast'
import { cognitoOAuthSignIn } from '@/lib/cognito'
import { GuestGuard } from '@/components/guards/GuestGuard'
import { Check, Zap, Shield, Clock, Star } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const { signup, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
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

  const handleOAuthSignup = (provider: 'Google' | 'Apple' | 'GitHub') => {
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
              <h2 className="text-2xl font-bold mb-6">Perché scegliere Centyr?</h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Elaborazione Istantanea</h3>
                    <p className="text-purple-100 text-sm">Centinaia di foto elaborate in pochi secondi con la nostra AI</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Risparmia 10+ Ore/Settimana</h3>
                    <p className="text-purple-100 text-sm">Automatizza l'editing manuale delle foto prodotto</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">30 Giorni Soddisfatti</h3>
                    <p className="text-purple-100 text-sm">Garanzia di rimborso completo, senza domande</p>
                  </div>
                </div>
              </div>

              {/* Social proof */}
              <div className="mt-8 pt-6 border-t border-white/20">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm font-semibold">4.9/5</span>
                </div>
                <p className="text-purple-100 text-sm mb-4">Valutazione media dei nostri clienti</p>

                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {['MB', 'ET', 'AR', 'SM'].map((initials, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-white/30 border-2 border-white flex items-center justify-center text-xs font-bold">
                        {initials}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-purple-100">
                    <span className="font-bold text-white">12,000+</span> e-commerce attivi
                  </p>
                </div>
              </div>

              {/* Features list */}
              <div className="mt-6 space-y-2">
                {['10 job gratis al mese', 'Nessuna carta richiesta', 'Setup in 60 secondi'].map((feature, i) => (
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
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Start aligning your product photos</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
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
                Email Address
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
                Password
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
              <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
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
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:text-fuchsia-600 font-semibold">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary-600 hover:text-fuchsia-600 font-semibold">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-purple-fuchsia text-white py-3 px-4 rounded-xl font-bold hover:scale-105 transition-all duration-300 shadow-lg glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white/80 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* OAuth Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => handleOAuthSignup('Google')}
              className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignup('GitHub')}
              className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignup('Apple')}
              className="flex items-center justify-center py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 group"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-primary-600 hover:text-fuchsia-600 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          {/* Free trial badge - shown on mobile only */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-fuchsia-50 border-2 border-fuchsia-200 rounded-xl p-4 text-center lg:hidden">
            <p className="text-sm font-semibold text-gray-900">
              🎉 Start with 10 free jobs/month
            </p>
            <p className="text-xs text-gray-600 mt-1">No credit card required</p>
          </div>
        </div>
        </div>
      </div>
    </GuestGuard>
  )
}
