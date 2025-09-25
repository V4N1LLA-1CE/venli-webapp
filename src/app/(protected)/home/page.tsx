"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'
import { useSetPageTitle } from '@/contexts/page-context'
import UserCard from '@/components/user-card'

const HomePage = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.profile)

  // set the page title
  useSetPageTitle('Home')

  if (loading) return <div className="px-4 lg:px-6">Loading user data...</div>
  if (error) return <div className="px-4 lg:px-6">Error: {error}</div>

  return (
    <div className="px-4 lg:px-6">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's what's happening in your network today.
          </p>
        </div>

        {user && (
          <UserCard user={user} />
        )}
      </div>
    </div>
  )
}

export default HomePage
