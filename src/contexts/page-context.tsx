"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface PageContextType {
  title: string
  setTitle: (title: string) => void
}

const PageContext = createContext<PageContextType | undefined>(undefined)

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [title, setTitle] = useState('Default Title')

  return (
    <PageContext.Provider value={{ title, setTitle }}>
      {children}
    </PageContext.Provider>
  )
}

export function usePageTitle() {
  const context = useContext(PageContext)
  if (context === undefined) {
    throw new Error('usePageTitle must be used within a PageProvider')
  }
  return context
}

// Hook to set page title from individual pages
export function useSetPageTitle(newTitle: string) {
  const { setTitle } = usePageTitle()

  useEffect(() => {
    setTitle(newTitle)

    // Cleanup: reset to Dashboard when component unmounts
    return () => setTitle('Dashboard')
  }, [newTitle, setTitle])
}
