import { NextRequest, NextResponse } from 'next/server'

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

  return NextResponse.json(data)
}
