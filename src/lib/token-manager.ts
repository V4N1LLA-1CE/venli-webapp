"use client"

const ACCESS_TOKEN_KEY = 'venli_access_token'

export class TokenManager {
  /**
   * Store access token in localStorage
   */
  static setAccessToken(token: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, token)
  }

  /**
   * Retrieve access token from localStorage
   */
  static getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  /**
   * Remove access token from localStorage
   */
  static removeAccessToken(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  /**
   * Check if user has a valid access token
   */
  static hasAccessToken(): boolean {
    return !!this.getAccessToken()
  }

  /**
   * Get Authorization header for API requests
   */
  static getAuthHeader(): { Authorization: string } | {} {
    const token = this.getAccessToken()
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  /**
   * Clear all authentication data (for logout)
   * - removes refreshtoken cookie from backend
   * - clears access token from localStorage
   */
  static async clearAuth(): Promise<void> {
    try {
      const url = process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL
      await fetch(`${url}/api/auth/logout`, {
        method: "POST",
        credentials: "include"
      })
    } catch (e) {
      console.error(e)
    } finally {
      this.removeAccessToken()
    }
  }
}
