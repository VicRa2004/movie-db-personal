import { createServerFn } from '@tanstack/react-start'
import { notFound } from '@tanstack/react-router'
import { z } from 'zod'

import {
  findUsers,
  findUserById,
  insertUser,
  updateUser,
  deleteUser,
} from './users.queries'
import {
  createUserSchema,
  updateUserSchema,
  updatePassword,
} from './users.schemas'
import { userMapper } from './users.mapper'

export const getUsersFn = createServerFn({ method: 'GET' }).handler(() =>
  findUsers(),
)

export const getOneUserFn = createServerFn({ method: 'GET' })
  .validator(z.object({ id: z.coerce.number() }))
  .handler(async ({ data }) => {
    const user = await findUserById(data.id)

    if (!user) throw notFound()

    return userMapper(user)
  })

export const createUserFn = createServerFn({ method: 'GET' })
  .validator(createUserSchema)
  .handler(async ({ data }) => {
    const user = await insertUser(data)

    return userMapper(user)
  })

export const updateUserFn = createServerFn({ method: 'GET' })
  .validator(updateUserSchema)
  .handler(async ({ data }) => {
    const user = await findUserById(data.id)

    if (!user) throw notFound()

    const updatedUser = await updateUser(user.id, {
      email: user.email,
      nombre: user.nombre,
    })

    return userMapper(updatedUser)
  })
