import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import { User, getStoredUser, getStoredToken, setAuth, clearAuth } from '@/lib/auth'
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
      const token = getStoredToken()
      const storedUser = getStoredUser()

      if (!token || !storedUser) {
        setIsLoading(false)
        return
      }

      // Verify token with backend
      const userData = await api.getUser()
      setUser(userData)
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
      const response = await api.login(email, password)
      setAuth(response.access_token, response.user)
      setUser(response.user)
      setIsAuthenticated(true)
      toast.success('Login successful!')
      router.push('/dashboard')
      return { success: true }
    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      return { success: false, error: error.message }
    }
  }

  const signup = async (email: string, password: string, fullName: string) => {
    try {
      await api.signup(email, password, fullName)
      toast.success('Account created! Please login.')
      router.push('/login')
      return { success: true }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed')
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    clearAuth()
    setUser(null)
    setIsAuthenticated(false)
    toast.success('Logged out successfully')
    router.push('/login')
  }

  const refreshUser = async () => {
    try {
      const userData = await api.getUser()
      setUser(userData)
      setAuth(getStoredToken()!, userData)
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
