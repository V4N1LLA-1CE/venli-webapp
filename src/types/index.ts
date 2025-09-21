export interface User {
  id: number
  email: string
  name: string | null
  headline: string | null
  bio: string | null
  location: string | null
  scopes: string[]
}

export interface AuthResponse {
  message: string
  access_token: string
}

export interface ProfileResponse {
  profile: User
}
