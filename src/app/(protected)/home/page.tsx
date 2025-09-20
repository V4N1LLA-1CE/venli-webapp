"use client"

import { useEffect, useState } from "react"
import { TokenManager } from "@/lib/token-manager"

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [refreshCookieStatus, setRefreshCookieStatus] = useState<'checking' | 'present' | 'missing' | 'error'>('checking')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get access token from localStorage
    const token = TokenManager.getAccessToken()
    setAccessToken(token)

    // Test refresh cookie by making API call
    const testRefreshCookie = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL || 'http://localhost:4000'
        const response = await fetch(`${backendUrl}/api/auth/refresh`, {
          method: 'GET',
          credentials: 'include' // Important: includes HTTP-only cookies
        })

        if (response.ok) {
          setRefreshCookieStatus('present')
        } else {
          setRefreshCookieStatus('missing')
        }
      } catch (error) {
        setRefreshCookieStatus('error')
        console.error('Error testing refresh cookie:', error)
      } finally {
        setLoading(false)
      }
    }

    testRefreshCookie()
  }, [])

  const handleLogout = async () => {
    try {
      await TokenManager.clearAuth()
      // Redirect to login after logout
      window.location.href = '/login'
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const handleRefreshToken = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_CORE_BASE_URL || 'http://localhost:4000'
      const response = await fetch(`${backendUrl}/api/auth/refresh`, {
        method: 'GET',
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        TokenManager.setAccessToken(data.access_token)
        setAccessToken(data.access_token)
      }
    } catch (error) {
      console.error('Refresh token error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jagged-ice-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Welcome to Venli</h1>
          <p className="text-muted-foreground">Token Status & Management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Access Token Card */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <h2 className="text-xl font-semibold">Access Token (localStorage)</h2>
            </div>

            {accessToken ? (
              <div className="space-y-2">
                <p className="text-sm text-green-600 font-medium">✅ Present</p>
                <div className="bg-muted p-3 rounded text-xs font-mono break-all">
                  {accessToken}
                </div>
                <p className="text-xs text-muted-foreground">
                  Stored in localStorage • Expires in ~3 minutes
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-600 font-medium">❌ Missing</p>
                <p className="text-xs text-muted-foreground">
                  No access token found in localStorage
                </p>
              </div>
            )}
          </div>

          {/* Refresh Cookie Card */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <h2 className="text-xl font-semibold">Refresh Token (HTTP-only Cookie)</h2>
            </div>

            <div className="space-y-2">
              {refreshCookieStatus === 'present' && (
                <>
                  <p className="text-sm text-green-600 font-medium">✅ Present</p>
                  <p className="text-xs text-muted-foreground">
                    Cookie detected via API call • Expires in 7 days
                  </p>
                </>
              )}

              {refreshCookieStatus === 'missing' && (
                <>
                  <p className="text-sm text-red-600 font-medium">❌ Missing</p>
                  <p className="text-xs text-muted-foreground">
                    No refresh token cookie found
                  </p>
                </>
              )}

              {refreshCookieStatus === 'error' && (
                <>
                  <p className="text-sm text-yellow-600 font-medium">⚠️ Error</p>
                  <p className="text-xs text-muted-foreground">
                    Unable to test cookie status
                  </p>
                </>
              )}

              <div className="bg-muted p-3 rounded text-xs">
                <p className="font-medium mb-1">HTTP-only Cookie Details:</p>
                <p>• Name: venli-refresh-token</p>
                <p>• Secure: {process.env.NODE_ENV === 'production' ? 'true' : 'false'}</p>
                <p>• SameSite: Lax</p>
                <p>• Value: Hidden from JavaScript (HTTP-only)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRefreshToken}
            disabled={refreshCookieStatus !== 'present'}
            className="px-6 py-2 bg-jagged-ice-500 text-white rounded-lg hover:bg-jagged-ice-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Refresh Access Token
          </button>

          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>

          <button
            onClick={() => window.location.href = '/login'}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}