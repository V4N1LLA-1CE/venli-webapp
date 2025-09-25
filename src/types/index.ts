export interface User {
  id: number
  email: string
  name: string | null
  headline: string | null
  bio: string | null
  location: string | null
  scopes: string[]

  // new fields to add
  accountType: string | null
  profileImage: string | null
}

export interface AuthResponse {
  message: string
  access_token: string
}

export interface ProfileResponse {
  profile: User
}
