// Updated User type to match new API (UserInfo from Cognito)
export interface User {
  user_id: string
  email: string
  email_verified: boolean
  username: string
  subscription: {
    plan: string
    usage: number
    quota: number
    status: string
  }
}

// Legacy support - convert old User format to new format if needed
export function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null

  const userData = localStorage.getItem('user')
  if (!userData) return null

  try {
    const parsed = JSON.parse(userData)

    // Check if it's old format and convert
    if (parsed.id && !parsed.user_id) {
      return {
        user_id: String(parsed.id),
        email: parsed.email,
        email_verified: true,
        username: parsed.email.split('@')[0],
        subscription: {
          plan: parsed.plan || 'free',
          usage: parsed.images_used_this_month || 0,
          quota: parsed.monthly_limit || 10,
          status: 'active',
        },
      }
    }

    return parsed
  } catch {
    return null
  }
}

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('auth_token')
}

export function setAuth(token: string, user: User) {
  localStorage.setItem('auth_token', token)
  localStorage.setItem('user', JSON.stringify(user))
}

export function clearAuth() {
  localStorage.removeItem('auth_token')
  localStorage.removeItem('user')
}

export function isAuthenticated(): boolean {
  return !!getStoredToken()
}

export function requireAuth(redirectTo: string = '/login'): boolean {
  if (!isAuthenticated()) {
    if (typeof window !== 'undefined') {
      window.location.href = redirectTo
    }
    return false
  }
  return true
}
