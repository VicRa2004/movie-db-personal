import { createServerFn } from '@tanstack/react-start'
import { redirect } from '@tanstack/react-router'
import { getAppSession } from '@/lib/session'
import { findUserByEmail, findUserById } from '../users/users.queries'
import { verifyPassword } from '#/lib/hash_password.ts'

export const loginFn = createServerFn({ method: 'POST' })
  .validator((data: { email: string; password: string }) => data)
  .handler(async ({ data }) => {
    const user = await findUserByEmail(data.email)

    if (!user) {
      return { error: 'Credenciales invalidas' }
    }

    if (!(await verifyPassword(data.password, user.password))) {
      return { error: 'Credenciales invalidas' }
    }

    // Create session
    const session = await getAppSession()
    session.userId = user.id
    await session.save()

    // Redirect to protected area
    throw redirect({ to: '/dashboard' })
  })

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
  const session = await getAppSession()
  session.destroy()
  throw redirect({ to: '/' })
})

export const getCurrentUserFn = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await getAppSession()
    const userId = session.userId

    if (!userId) {
      return null
    }

    const user = await findUserById(userId)
    return user ? { id: user.id, email: user.email } : null
  },
)
