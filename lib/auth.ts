import { Features } from './api';

// User type matches API UserInfo
export interface User {
  user_id: string
  email: string
  email_verified: boolean
  username: string
  name?: string
  subscription: {
    plan: string
    plan_name: string
    current_period_uploads: number
    monthly_limit: number
    status: string
    usage_percentage: number
    features: Features;
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
          plan_name: parsed.plan_name || 'Free',
          current_period_uploads: parsed.current_period_uploads || 0,
          monthly_limit: parsed.monthly_limit || 10,
          status: 'active',
          usage_percentage: parsed.monthly_limit
            ? Math.round((parsed.current_period_uploads || 0) / parsed.monthly_limit * 100)
            : 0,
          features: {
            analytics_enabled: parsed.analytics_enabled ?? false,
            max_batch_size: parsed.max_batch_size ?? 3,
            monthly_limit: parsed.monthly_limit ?? 10,
            plan_id: parsed.plan || 'free',
            plan_name: parsed.plan_name || 'Free',
            priority_queue: parsed.priority_queue ?? false,
            rate_limit_per_hour: parsed.rate_limit_per_hour ?? 100,
            rate_limit_per_minute: parsed.rate_limit_per_minute ?? 20,
            storage_retention_days: parsed.storage_retention_days ?? 7,
            webhooks_enabled: parsed.webhooks_enabled ?? false
          }
        }
      };
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
