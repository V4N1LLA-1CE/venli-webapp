"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { User } from "@/types"
import { Check, X } from "lucide-react"

interface ProfileEditFormProps {
  user: User
  onSave: (updatedData: Partial<User>) => Promise<void>
  onCancel: () => void
}

export function ProfileEditForm({ user, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || '',
    headline: user.headline || '',
    bio: user.bio || '',
    location: user.location || ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const initialData = {
    name: user.name || '',
    headline: user.headline || '',
    bio: user.bio || '',
    location: user.location || ''
  }

  const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSave(formData)
    } catch (error) {
      console.error('Failed to save profile:', error)
    } finally {
      setIsSubmitting(false)
    }
  }


  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Personal Information
          </h3>

          <div className="grid grid-cols-1">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
                className="rounded-lg"
                maxLength={50}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.name.length}/50 characters
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="headline" className="text-sm font-medium">Professional Headline</Label>
              <Input
                id="headline"
                value={formData.headline}
                onChange={(e) => handleInputChange('headline', e.target.value)}
                placeholder="e.g. Senior Product Manager at Tech Co"
                className="rounded-lg"
                maxLength={100}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.headline.length}/100 characters
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="rounded-lg"
                maxLength={50}
              />
              <div className="text-xs text-muted-foreground text-right">
                {formData.location.length}/50 characters
              </div>
            </div>
          </div>
        </div>


        {/* Bio Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            About
          </h3>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself, your experience, and what you're looking for..."
              className="rounded-lg resize-none min-h-[120px]"
              maxLength={1000}
            />
            <div className="text-xs text-muted-foreground text-right">
              {formData.bio.length}/1000 characters
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || !hasChanges}
            className="flex-1 bg-jagged-ice-600 hover:bg-jagged-ice-700 text-white hover:cursor-pointer rounded-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="h-4 w-4 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
                Saving...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-full hover:cursor-pointer"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
