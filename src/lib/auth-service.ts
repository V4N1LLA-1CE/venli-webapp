"use client"

import { TokenManager } from './token-manager'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  access_token: string
}

export class AuthService {
  /**
   * Login with email and password
   */
  static async emailPasswordLogin(credentials: LoginCredentials): Promise<void> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid email or password')
      } else {
        throw new Error('Login failed. Please try again.')
      }
    }

    const data: LoginResponse = await response.json()
    TokenManager.setAccessToken(data.access_token)
  }
}