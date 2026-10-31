export interface User {
  id: number
  nombre: string
  email: string
  password: string
  createdAt: Date
}

export interface UserCreate {
  nombre: string
  email: string
  password: string
}

export interface UserUpdate {
  id: number
  nombre: string
  email: string
}
