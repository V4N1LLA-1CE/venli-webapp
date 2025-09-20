"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { TokenManager } from "@/lib/token-manager"

export default function OAuthCallback() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token')

    if (!token) {
      setStatus('error')
      setMessage('No access token received from authentication')
      return
    }

    try {
      // Store the access token using TokenManager
      TokenManager.setAccessToken(token)

      setStatus('success')
      setMessage('Authentication successful! Redirecting...')

      // Clear the token from URL for security
      window.history.replaceState({}, document.title, '/oauth/callback')

      // Redirect to dashboard or home page after a short delay
      setTimeout(() => {
        router.push('/dashboard') // Change this to your desired redirect path
      }, 2000)

    } catch (error) {
      setStatus('error')
      setMessage('Failed to process authentication')
      console.error('OAuth callback error:', error)
    }
  }, [searchParams, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-jagged-ice-500 mx-auto"></div>
          <p className="text-muted-foreground">Processing authentication...</p>
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-500 text-4xl">⚠️</div>
          <h1 className="text-2xl font-bold text-foreground">Authentication Failed</h1>
          <p className="text-muted-foreground">{message}</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-jagged-ice-500 text-white rounded-lg hover:bg-jagged-ice-600 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="text-green-500 text-4xl">✅</div>
        <h1 className="text-2xl font-bold text-foreground">Authentication Successful!</h1>
        <p className="text-muted-foreground">{message}</p>
        <div className="animate-pulse text-jagged-ice-500">Redirecting...</div>
      </div>
    </div>
  )
}