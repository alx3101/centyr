import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { User, getStoredUser, setAuth, clearAuth } from '@/lib/auth'
import {
  cognitoSignIn,
  cognitoSignUp,
  cognitoSignOut,
  cognitoGetIdToken,
} from '@/lib/cognito'
import toast from 'react-hot-toast'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Get ID token from Cognito session
      const idToken = await cognitoGetIdToken()

      if (!idToken) {
        setIsLoading(false)
        return
      }

      // Store token for API calls
      localStorage.setItem('auth_token', idToken)

      // Fetch user data from backend using Cognito token
      const userData = await api.getCurrentUser()
      setUser(userData)
      setAuth(idToken, userData)
      setIsAuthenticated(true)
    } catch (error) {
      console.error('Auth check failed:', error)
      clearAuth()
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      // Sign in with Cognito
      const result = await cognitoSignIn(email, password)

      if (!result.success || !result.idToken) {
        toast.error(result.error || 'Login failed')
        return { success: false, error: result.error }
      }

      // Store token
      localStorage.setItem('auth_token', result.idToken)

      // Fetch user data from backend
      const userData = await api.getCurrentUser()
      setUser(userData)
      setAuth(result.idToken, userData)
      setIsAuthenticated(true)

      toast.success('Login successful!')
      router.push('/dashboard')
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      // Sign up with Cognito
      const result = await cognitoSignUp(email, password, { name: fullName })

      if (!result.success) {
        toast.error(result.error || 'Signup failed')
        return { success: false, error: result.error }
      }

      toast.success('Account created! Please check your email to verify your account.')
      router.push('/verify-email?email=' + encodeURIComponent(email))
      return { success: true }
    } catch (error: any) {
      const errorMessage = error.message || 'Signup failed'
      toast.error(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  const logout = () => {
    // Sign out from Cognito
    cognitoSignOut()

    // Clear local storage and state
    clearAuth()
    setUser(null)
    setIsAuthenticated(false)

    toast.success('Logged out successfully')
    router.push('/login')
  }

  const refreshUser = async () => {
    try {
      // Get fresh ID token from Cognito
      const idToken = await cognitoGetIdToken()

      if (!idToken) {
        // Session expired
        logout()
        return
      }

      // Update token
      localStorage.setItem('auth_token', idToken)

      // Fetch updated user data
      const userData = await api.getCurrentUser()
      setUser(userData)
      setAuth(idToken, userData)
    } catch (error) {
      console.error('Failed to refresh user:', error)
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshUser,
  }
}
