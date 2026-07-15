import { NextResponse } from 'next/server'
import { REFRESH_COOKIE, refreshCookieOptions } from '@/lib/authCookie'

/** Clear the httpOnly refresh cookie so signing out actually ends the session. */
export async function POST() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(REFRESH_COOKIE, '', { ...refreshCookieOptions(), maxAge: 0 })
  return response
}
