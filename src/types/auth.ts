export type UserRole = 'admin' | 'reviewer'

export type AuthUser = {
  email: string
  name: string
  role: UserRole
}

export type AuthState = {
  isAuthenticated: boolean
  user: AuthUser | null
}