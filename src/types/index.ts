export type User = {
  id: number
  email: string
  name?: string
  headline?: string
  bio?: string
  location?: string
  scopes: string[]
  account_type?: string
  pfp_url?: string
}

export interface AuthResponse {
  message: string
  access_token: string
}

export interface ProfileResponse {
  profile: User
}
