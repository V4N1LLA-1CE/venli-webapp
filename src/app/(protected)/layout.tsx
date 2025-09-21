"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux-store'
import { UserProvider } from '@/components/providers/user-provider'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <UserProvider>
        {children}
      </UserProvider>
    </Provider>
  )
}
