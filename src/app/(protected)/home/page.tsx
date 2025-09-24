"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSetPageTitle } from '@/contexts/page-context'

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
          <h1 className="text-2xl font-bold">Welcome to Venli!</h1>
          <p className="text-muted-foreground">
            Connect with VCs and founders in your network.
          </p>
        </div>

        {user && (
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>
                Your profile information and current activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">{user.name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Headline</p>
                  <p className="text-sm text-muted-foreground">{user.headline || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{user.location || 'Not set'}</p>
                </div>
              </div>
              {user.bio && (
                <div>
                  <p className="text-sm font-medium">Bio</p>
                  <p className="text-sm text-muted-foreground">{user.bio}</p>
                </div>
              )}
              <div>
                <p className="text-sm font-medium">Access Scopes</p>
                <p className="text-sm text-muted-foreground">{user.scopes.join(', ')}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default HomePage
