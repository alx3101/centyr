/**
 * Server-only helpers for the Cognito refresh-token cookie.
 *
 * The refresh token is long-lived (Cognito default: 30 days) and grants new
 * id_tokens for the whole period, so it must never be readable by client-side
 * JS. It lives in an httpOnly cookie and is only ever read server-side by
 * /api/auth/refresh.
 */

export const REFRESH_COOKIE = 'centyr_rt'

/** Cognito refresh tokens default to 30 days. */
const THIRTY_DAYS_SECONDS = 30 * 24 * 60 * 60

export function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: THIRTY_DAYS_SECONDS,
  }
}
