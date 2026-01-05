'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { User, setAuth, clearAuth as clearAuthStorage } from '@/lib/auth'
import {
  cognitoSignIn,
  cognitoSignUp,
  cognitoSignOut,
  cognitoGetIdToken,
} from '@/lib/cognito'
import toast from 'react-hot-toast'

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  signup: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking')
  const [user, setUser] = useState<User | null>(null)

  const isLoading = authStatus === 'checking'
  const isAuthenticated = authStatus === 'authenticated'

  /**
   * 🔐 CHECK AUTH (source of truth = Cognito)
   */
  const checkAuth = useCallback(async () => {
    setAuthStatus('checking')

    try {
      const idToken = await cognitoGetIdToken()

      if (!idToken) {
        clearAuthStorage()
        setUser(null)
        setAuthStatus('unauthenticated')
        return
      }

      // Cache token (solo dopo verifica Cognito)
      localStorage.setItem('auth_token', idToken)

      const userData = await api.getCurrentUser()
      setUser(userData)
      setAuth(idToken, userData)
      setAuthStatus('authenticated')
    } catch (error) {
      console.error('Auth check failed:', error)
      clearAuthStorage()
      setUser(null)
      setAuthStatus('unauthenticated')
    }
  }, [])

  /**
   * 🔄 INIT
   */
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  /**
   * 🔑 LOGIN
   */
  const login = useCallback(async (email: string, password: string) => {
    try {
      setAuthStatus('checking')

      const result = await cognitoSignIn(email, password)

      if (!result.success || !result.idToken) {
        toast.error(result.error || 'Login failed')
        setAuthStatus('unauthenticated')
        return { success: false, error: result.error }
      }

      localStorage.setItem('auth_token', result.idToken)

      const userData = await api.getCurrentUser()
      setUser(userData)
      setAuth(result.idToken, userData)
      setAuthStatus('authenticated')

      toast.success('Login successful!')
      return { success: true }
    } catch (error: any) {
      const message = error.message || 'Login failed'
      toast.error(message)
      setAuthStatus('unauthenticated')
      return { success: false, error: message }
    }
  }, [])

  /**
   * 📝 SIGNUP
   */
  const signup = useCallback(
    async (email: string, password: string, fullName: string) => {
      try {
        setAuthStatus('checking')

        const result = await cognitoSignUp(email, password, { name: fullName })

        if (!result.success) {
          toast.error(result.error || 'Signup failed')
          setAuthStatus('unauthenticated')
          return { success: false, error: result.error }
        }

        toast.success('Account created! Check your email to verify.')
        setAuthStatus('unauthenticated')
        return { success: true }
      } catch (error: any) {
        const message = error.message || 'Signup failed'
        toast.error(message)
        setAuthStatus('unauthenticated')
        return { success: false, error: message }
      }
    },
    []
  )

  /**
   * 🚪 LOGOUT
   */
  const logout = useCallback(() => {
    cognitoSignOut()
    clearAuthStorage()
    setUser(null)
    setAuthStatus('unauthenticated')
    router.replace('/')
    toast.success('Logged out')
  }, [router])

  /**
   * ♻️ REFRESH USER
   */
  const refreshUser = useCallback(async () => {
    try {
      const idToken = await cognitoGetIdToken()

      if (!idToken) {
        logout()
        return
      }

      localStorage.setItem('auth_token', idToken)

      const userData = await api.getCurrentUser()
      setUser(userData)
      setAuth(idToken, userData)
      setAuthStatus('authenticated')
    } catch (error) {
      console.error('Failed to refresh user:', error)
      logout()
    }
  }, [logout])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * 🪝 USE AUTH
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
