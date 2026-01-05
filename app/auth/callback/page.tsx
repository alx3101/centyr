'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { setAuth } from '@/lib/auth'
import { Loader } from 'lucide-react'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        // Get authorization code from URL
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const errorParam = params.get('error')
        const errorDescription = params.get('error_description')

        if (errorParam) {
          setError(errorDescription || errorParam)
          setTimeout(() => router.push('/login'), 3000)
          return
        }

        if (!code) {
          setError('No authorization code received')
          setTimeout(() => router.push('/login'), 3000)
          return
        }

        // Exchange authorization code for tokens
        // This would typically be done on the backend, but Cognito SDK handles it
        const region = process.env.NEXT_PUBLIC_COGNITO_REGION
        const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID
        const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
        const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`

        // Extract domain from user pool ID
        const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN  // ✅ Usa il dominio configurato
        const cognitoDomain = `https://${domain}.auth.${region}.amazoncognito.com`


        // Exchange code for tokens
        const tokenResponse = await fetch(`${cognitoDomain}/oauth2/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId || '',
            code: code,
            redirect_uri: redirectUri,
          }).toString(),
        })

        if (!tokenResponse.ok) {
          throw new Error('Failed to exchange authorization code')
        }

        const tokens = await tokenResponse.json()
        const idToken = tokens.id_token

        if (!idToken) {
          throw new Error('No ID token received')
        }

        // Store token
        localStorage.setItem('auth_token', idToken)

        // Fetch user data from backend
        const userData = await api.getCurrentUser()

        // Save auth state
        setAuth(idToken, userData)

        // Redirect to dashboard
        router.push('/dashboard')
      } catch (err: any) {
        console.error('OAuth callback error:', err)
        setError(err.message || 'Authentication failed')
        setTimeout(() => router.push('/login'), 3000)
      }
    }

    handleOAuthCallback()
  }, [router])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-2 border-red-200 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Authentication Failed</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200 text-center">
        <Loader className="w-16 h-16 text-purple-600 animate-spin mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Completing Sign In</h1>
        <p className="text-gray-600">Please wait while we set up your account...</p>
      </div>
    </div>
  )
}
