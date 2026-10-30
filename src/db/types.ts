import type {
  Generated,
  ColumnType,
  Selectable,
  Insertable,
  Updateable,
} from 'kysely'

export interface UserTable {
  id: Generated<number>
  email: string
  nombre: string
  created_at: ColumnType<Date, string | undefined, never>
}

export interface Database {
  users: UserTable // la llave = nombre real de la tabla
}

export type User = Selectable<UserTable>
export type NewUser = Insertable<UserTable>
export type UserUpdate = Updateable<UserTable>
