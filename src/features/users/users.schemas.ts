import { z } from 'zod'

export const createUserSchema = z.object({
  nombre: z.string().min(1).max(100),
  email: z.email('El correo es requerido'),
  password: z
    .string()
    .min(6, 'La contraseña debe contener minimo 6 caracteres')
    .max(20, 'La contraseña debe de tener maximo 20 caracteres'),
})

export const updateUserSchema = z.object({
  id: z.coerce.number(),
  nombre: z.string().optional(),
  email: z.email().optional(),
})

export const updatePassword = z.object({
  password: z
    .string()
    .min(6, 'La contraseña debe contener minimo 6 caracteres')
    .max(20, 'La contraseña debe de tener maximo 20 caracteres'),
  newPassword: z
    .string()
    .min(6, 'La contraseña debe contener minimo 6 caracteres')
    .max(20, 'La contraseña debe de tener maximo 20 caracteres'),
})
