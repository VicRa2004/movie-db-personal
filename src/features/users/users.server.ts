import { db } from '@/db'
import type { UserCreate, UserUpdate } from './users.types'

// Funciones - CRUD
export const findUsers = async () => {
  const usuarios = await db
    .selectFrom('users')
    .select(['id', 'nombre', 'email', 'password', 'created_at'])
    .execute()

  return usuarios
}

export const findUserById = async (id: number) => {
  const [usuario] = await db
    .selectFrom('users')
    .select(['id', 'nombre', 'email', 'password', 'created_at'])
    .where('id', '=', id)
    .execute()

  return usuario
}

export const findUsuarioByEmail = async (email: string) => {
  const [usuario] = await db
    .selectFrom('users')
    .select(['id', 'nombre', 'email', 'password', 'users.created_at'])
    .where('email', '=', email)
    .execute()

  return usuario
}

export const createUser = async (data: UserCreate) => {
  const nuevo = await db
    .insertInto('users')
    .values(data)
    .returningAll()
    .executeTakeFirstOrThrow()

  return nuevo
}

export const updateUser = async (id: number, data: UserUpdate) => {
  const [usuario] = await db
    .updateTable('users')
    .set(data)
    .where('id', '=', id)
    .returningAll()
    .execute()

  return usuario
}

export const deleteUser = async (id: number) => {
  await db.deleteFrom('users').where('id', '=', id).execute()
}
