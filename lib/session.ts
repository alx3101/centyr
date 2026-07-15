import { cognitoGetIdToken } from './cognito'

/**
 * Single source of truth for "give me a usable id_token right now".
 *
 * Callers used to read localStorage('auth_token') directly, which is a token
 * cached once at mount. Cognito id_tokens live 1h, so after an hour every API
 * call was sending an expired token and the session looked dead. This renews it
 * instead:
 *   - email/password logins -> the Cognito SDK refreshes transparently
 *   - Hosted UI (Google) logins -> POST /api/auth/refresh, which uses the
 *     httpOnly refresh cookie server-side
 */

const TOKEN_KEY = 'auth_token'
/** Renew slightly early so a request can't expire in flight. */
const EXPIRY_SKEW_SECONDS = 60

function isExpired(jwt: string, skewSeconds = EXPIRY_SKEW_SECONDS): boolean {
  try {
    const payload = jwt.split('.')[1]
    if (!payload) return true
    const decoded = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    if (!decoded?.exp) return true
    return Date.now() >= decoded.exp * 1000 - skewSeconds * 1000
  } catch {
    return true
  }
}

/** De-dupe concurrent refreshes: parallel API calls share one request. */
let inFlightRefresh: Promise<string | null> | null = null

function refreshViaCookie(): Promise<string | null> {
  if (!inFlightRefresh) {
    inFlightRefresh = fetch('/api/auth/refresh', { method: 'POST' })
      .then(async (res) => {
        if (!res.ok) return null
        const data = await res.json()
        if (!data?.id_token) return null
        localStorage.setItem(TOKEN_KEY, data.id_token)
        return data.id_token as string
      })
      .catch(() => null)
      .finally(() => {
        inFlightRefresh = null
      })
  }
  return inFlightRefresh
}

export async function getFreshIdToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null

  // Email/password: the SDK holds a refresh token and renews on getSession().
  try {
    const sdkToken = await cognitoGetIdToken()
    if (sdkToken) {
      localStorage.setItem(TOKEN_KEY, sdkToken)
      return sdkToken
    }
  } catch {
    // fall through to the Hosted UI path
  }

  // Hosted UI: reuse the cached token while it's still valid.
  const cached = localStorage.getItem(TOKEN_KEY)
  if (cached && !isExpired(cached)) return cached

  // Expired (or missing): renew from the httpOnly refresh cookie.
  return refreshViaCookie()
}

/** Clear the refresh cookie. Local storage is cleared by lib/auth. */
export async function clearServerSession(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
  } catch {
    // Best effort: local sign-out still proceeds.
  }
}
