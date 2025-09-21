"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'

const HomePage = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.profile)

  if (loading) return <div>Loading user data...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Welcome to Venli!</h1>
      {user && (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Your Profile</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Name:</strong> {user.name || 'Not set'}</p>
          <p><strong>Headline:</strong> {user.headline || 'Not set'}</p>
          <p><strong>Bio:</strong> {user.bio || 'Not set'}</p>
          <p><strong>Location:</strong> {user.location || 'Not set'}</p>
          <p><strong>Scopes:</strong> {user.scopes.join(', ')}</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
