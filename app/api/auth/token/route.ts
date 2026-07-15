import { NextRequest, NextResponse } from 'next/server'
import { REFRESH_COOKIE, refreshCookieOptions } from '@/lib/authCookie'

export async function POST(request: NextRequest) {
  const { code } = await request.json()

  const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID
  const domain = process.env.NEXT_PUBLIC_COGNITO_DOMAIN
  const region = process.env.NEXT_PUBLIC_COGNITO_REGION
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  const cognitoDomain = domain?.startsWith('https://')
    ? domain
    : `https://${domain}.auth.${region}.amazoncognito.com`

  const redirectUri = `${appUrl}/auth/callback`

  const tokenResponse = await fetch(`${cognitoDomain}/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId || '',
      code,
      redirect_uri: redirectUri,
    }).toString(),
  })

  const data = await tokenResponse.json()

  if (!tokenResponse.ok) {
    console.error('[auth/token] Cognito error:', tokenResponse.status, data)
    return NextResponse.json(
      { error: data.error, error_description: data.error_description },
      { status: tokenResponse.status }
    )
  }

  // Keep the refresh token out of client-side JS: it goes into an httpOnly
  // cookie and is only read server-side by /api/auth/refresh. Previously it was
  // returned to the browser and dropped on the floor, so a Hosted UI session
  // died as soon as the id_token expired (1h) with nothing to renew it.
  const { refresh_token, ...clientTokens } = data

  const response = NextResponse.json(clientTokens)

  if (refresh_token) {
    response.cookies.set(REFRESH_COOKIE, refresh_token, refreshCookieOptions())
  }

  return response
}
