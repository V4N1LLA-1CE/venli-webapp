"use client"

import * as React from "react"
import {
  IconBuilding,
  IconChartBar,
  IconDashboard,
  IconMessage,
  IconCalendar,
  IconBrandLinkedin,
  IconNetwork,
  IconTrendingUp,
  IconHelp,
  IconSearch,
  IconSettings,
  IconUsers,
  IconMoneybag,
  IconRocket,
  IconUserPlus,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TokenManager } from "@/lib/token-manager"
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'

const data = {
  user: {
    name: "Loading...",
    email: "loading@venli.com",
    avatar: "/avatars/default.jpg",
  },
  navMain: [
    {
      title: "Home",
      url: "/home",
      icon: IconDashboard,
    },
    {
      title: "Network",
      url: "/network",
      icon: IconUsers,
    },
    {
      title: "Deals & Investments",
      url: "/deals",
      icon: IconMoneybag,
    },
    {
      title: "Startups",
      url: "/startups",
      icon: IconRocket,
    },
    {
      title: "Investors",
      url: "/investors",
      icon: IconBuilding,
    },
  ],
  navConnectionsFlat: [
    {
      title: "Messages",
      icon: IconMessage,
      url: "/messages",
    },
    {
      title: "Meetings",
      icon: IconCalendar,
      url: "/meetings",
    },
    {
      title: "Connections",
      icon: IconUserPlus,
      url: "/connections",
    },
  ],
  navSecondary: [
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconChartBar,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Search",
      url: "/search",
      icon: IconSearch,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: IconHelp,
    },
  ],
  insights: [
    {
      name: "Market Trends",
      url: "/insights/trends",
      icon: IconTrendingUp,
    },
    {
      name: "Industry Reports",
      url: "/insights/reports",
      icon: IconChartBar,
    },
    {
      name: "Social Feed",
      url: "/feed",
      icon: IconBrandLinkedin,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((state: RootState) => state.profile)

  const handleLogout = async () => {
    await TokenManager.clearAuth()
    window.location.href = '/login'
  }

  const userData = user ? {
    name: user.name || user.email.split('@')[0],
    email: user.email,
    avatar: "/avatars/default.jpg",
  } : data.user

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 hover:bg-jagged-ice-50 dark:hover:bg-jagged-ice-950"
            >
              <a href="/home">
                <div className="flex h-5 w-5 items-center justify-center rounded bg-jagged-ice-500 text-white shadow-sm">
                  <span className="text-xs font-bold">V</span>
                </div>
                <span className="text-base font-semibold text-jagged-ice-700 dark:text-jagged-ice-300">Venli</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} showQuickCreate={true} />
        <NavMain items={data.navConnectionsFlat} />
        <NavDocuments items={data.insights} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} onLogout={handleLogout} />
      </SidebarFooter>
    </Sidebar>
  )
}
