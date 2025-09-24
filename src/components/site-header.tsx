import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { IconBell, IconSearch } from "@tabler/icons-react"
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler"

interface SiteHeaderProps {
  title?: string
}

export function SiteHeader({ title = "Dashboard" }: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
        <div className="ml-auto flex items-center gap-2">
          <AnimatedThemeToggler />
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-jagged-ice-50 dark:hover:bg-jagged-ice-950 hover:text-jagged-ice-600 dark:hover:text-jagged-ice-400">
            <IconSearch className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-jagged-ice-50 dark:hover:bg-jagged-ice-950 hover:text-jagged-ice-600 dark:hover:text-jagged-ice-400">
            <IconBell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
