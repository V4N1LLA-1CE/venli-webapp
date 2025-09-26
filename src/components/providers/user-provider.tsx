"use client"

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'
import { loadUserProfile } from '@/lib/profile-slice'
import { TokenManager } from '@/lib/token-manager'

export function UserProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch()
  const { user, loading, error } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    // Always try to load user profile if not already loaded/loading
    // This ensures API client handles auth properly (redirects on 401)
    if (!user && !loading && !error) {
      dispatch(loadUserProfile() as any)
    }
  }, [dispatch, user, loading, error])

  // Don't show any loading state - just let the page render normally

  // if error (user not found), redirect to login
  if (error) {
    TokenManager.removeAccessToken()
    window.location.href = '/login'
    return null
  }

  // show nothing if no user (will redirect via API client)
  if (!user && !loading) {
    return null
  }

  return <>{children}</>
}
