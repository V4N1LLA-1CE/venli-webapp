"use client"

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useSetPageTitle } from '@/contexts/page-context'
import { MapPin, Building, Calendar, Users, Edit, ExternalLink } from 'lucide-react'

const HomePage = () => {
  const { user, loading, error } = useSelector((state: RootState) => state.profile)

  // set the page title
  useSetPageTitle('Home')

  if (loading) return <div className="px-4 lg:px-6">Loading user data...</div>
  if (error) return <div className="px-4 lg:px-6">Error: {error}</div>

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Mock data for enhanced profile (you can replace these with real data later)
  const mockData = {
    bannerImage: null, // Will show gradient fallback
    profileImage: user?.profileImage || null,
    company: "TechFlow Ventures", // Placeholder
    title: "Senior Partner",
    industry: "FinTech",
    tags: ["SaaS", "B2B", "Growth Stage", "AI/ML"],
    connections: 247,
    investments: 12,
    joinDate: "March 2023",
    linkedinUrl: "https://linkedin.com/in/placeholder"
  }

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
          <div className="max-w-2xl">
            <Card className="overflow-hidden">
              {/* Banner Section */}
              <div className="relative h-34 bg-jagged-ice-500 rounded-xl m-1">

                {/* Avatar positioned half on banner, half below */}
                <Avatar className="absolute bottom-0 left-6 translate-y-1/2 h-24 w-24 border-4 border-background shadow-lg rounded-xl">
                  <AvatarImage src={mockData.profileImage} alt={user.name || user.email} />
                  <AvatarFallback className="text-lg font-bold bg-jagged-ice-100 text-jagged-ice-700 rounded-lg">
                    {getInitials(user.name || user.email)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <CardContent className="p-8 pt-8">
                <div className="space-y-6">
                  {/* Header with Name and Account Type */}
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">{user.name || user.email.split('@')[0]}</h2>
                      <p className="text-muted-foreground text-lg">{user.headline || mockData.title}</p>
                    </div>

                    {/* Account Type Badge - More prominent */}
                    <Badge className="bg-jagged-ice-200 text-jagged-ice-800 hover:bg-jagged-ice-300 border-0 px-4 py-2 text-sm font-bold shadow-sm rounded-full">
                      INVESTOR
                    </Badge>
                  </div>

                  {/* Professional Details Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Details</h3>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{mockData.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{user.location || "Not Set"}</span>
                      </div>
                    </div>
                  </div>

                  {/* About Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">About</h3>
                    <p className="text-sm text-foreground leading-relaxed">
                      {user.bio || "Building the future of startup ecosystems. Passionate about connecting innovative founders with strategic capital."}
                    </p>
                  </div>

                  {/* Expertise Section */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-jagged-ice-500 text-white hover:bg-jagged-ice-600 border-0 font-medium">
                        {mockData.industry}
                      </Badge>
                      {mockData.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0">
                          {tag}
                        </Badge>
                      ))}
                      {mockData.tags.length > 3 && (
                        <Badge variant="outline" className="border-gray-300 text-gray-500 hover:bg-gray-50">
                          +{mockData.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
