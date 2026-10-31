import type { Users } from '@/db/types'

export type UserCreate = Omit<Users, 'id' | 'created_at'>

export type UserUpdate = Partial<UserCreate>
