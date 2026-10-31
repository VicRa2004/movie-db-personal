import { getIronSession } from 'iron-session'
import { getCookie, setCookie } from '@tanstack/react-start/server'

type SessionData = {
  userId: number
  oauthState: string
}

export function getAppSession(ttl = 7 * 24 * 60 * 60) {
  const password = process.env.SESSION_SECRET
  if (!password || password.length < 32) {
    throw new Error('SESSION_SECRET must be at least 32 characters')
  }

  return getIronSession<SessionData>(
    { read: getCookie, write: setCookie },
    {
      cookieName: 'app-session',
      password,
      ttl,
      cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        httpOnly: true,
        path: '/',
      },
    },
  )
}
