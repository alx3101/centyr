import { NextRequest, NextResponse } from 'next/server'
import { REFRESH_COOKIE, refreshCookieOptions } from '@/lib/authCookie'

/**
 * Mint a fresh id_token from the httpOnly refresh cookie.
 *
 * Hosted UI (Google) logins have no client-side Cognito SDK session, so this is
 * the only way their session survives past the 1h id_token expiry.
 */
export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value

  if (!refreshToken) {
    return NextResponse.json({ error: 'no_refresh_token' }, { status: 401 })
  }

  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION

  const cognitoDomain = domain?.startsWith('https://')
    ? domain
    : `https://${domain}.auth.${region}.amazoncognito.com`

  const tokenResponse = await fetch(`${cognitoDomain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: clientId || '',
      refresh_token: refreshToken,
    }).toString(),
  })

  const data = await tokenResponse.json()

  if (!tokenResponse.ok) {
    // Refresh token revoked or expired: drop the cookie so the client stops
    // retrying and sends the user back through login.
    console.error('[auth/refresh] Cognito error:', tokenResponse.status, data?.error)
    const response = NextResponse.json({ error: data?.error || 'refresh_failed' }, { status: 401 })
    response.cookies.set(REFRESH_COOKIE, '', { ...refreshCookieOptions(), maxAge: 0 })
    return response
  }

  // The refresh grant returns a new id_token/access_token but reuses the same
  // refresh token, so the cookie stays as-is.
  return NextResponse.json({
    id_token: data.id_token,
    expires_in: data.expires_in,
  })
}
