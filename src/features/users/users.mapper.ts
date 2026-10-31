import type { Users } from '@/db/types.ts'
import type { User } from './users.types'

import type { Selectable } from 'kysely'

export const userMapper = (user: Selectable<Users>): User => {
  return {
    id: user.id,
    nombre: user.nombre,
    email: user.email,
    password: user.password,
    createdAt: new Date(user.created_at),
  }
}
