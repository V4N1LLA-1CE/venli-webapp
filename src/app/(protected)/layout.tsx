"use client"

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/lib/redux-store'
import { UserProvider } from '@/components/providers/user-provider'
import { PageProvider, usePageTitle } from '@/contexts/page-context'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { title } = usePageTitle()

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader title={title} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <UserProvider>
        <PageProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </PageProvider>
      </UserProvider>
    </Provider>
  )
}
