"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'
import { useSetPageTitle } from '@/contexts/page-context'
import ProfileCard from '@/components/profile-card'
import { ProfileCardSkeleton } from '@/components/profile-card-skeleton'

const HomePage = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.profile)

  // set the page title
  useSetPageTitle('Home')

  if (error) return <div className="px-4 lg:px-6">Error: {error}</div>

  return (
    <div className="px-4 lg:px-6">
      <div className="flex flex-col gap-6">
        {user ? (
          <ProfileCard user={user} />
        ) : (
          <ProfileCardSkeleton />
        )}
      </div>
    </div>
  )
}

export default HomePage
