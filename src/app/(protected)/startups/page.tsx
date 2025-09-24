"use client"

import { useSetPageTitle } from "@/contexts/page-context"

export default function StartupsPage() {

  // set the page title
  useSetPageTitle('Startups')

  return (
    <div>Startups Page</div>
  )
}

