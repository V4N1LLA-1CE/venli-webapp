import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { User } from "@/types"
import { MapPin, UserPen, X, ChevronDown } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import AccountBadge from "./account-badge"
import { ProfileEditForm } from "./profile-edit-form"
import { updateUserProfile } from "@/lib/profile-slice"
import { RootState } from "@/lib/redux-store"

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const ProfileCard = ({ user: initialUser }: { user: User }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const dispatch = useDispatch()
  const { user: reduxUser, loading } = useSelector((state: RootState) => state.profile)

  // Always prefer initial prop during edit mode to prevent flickering,
  // otherwise use Redux user for updates
  const user = isEditing ? initialUser : (reduxUser || initialUser)

  // Check if bio content is overflowing
  useEffect(() => {
    const checkOverflow = () => {
      if (bioRef.current) {
        const isOverflowing = bioRef.current.scrollHeight > bioRef.current.clientHeight
        setShowScrollIndicator(isOverflowing)
      }
    }

    checkOverflow()
    // Recheck when user changes (bio content might change)
    const timeoutId = setTimeout(checkOverflow, 100)
    return () => clearTimeout(timeoutId)
  }, [user.bio])

  const handleSave = async (updatedData: Partial<User>) => {
    try {
      // Start both the API call and minimum delay
      const [apiResult] = await Promise.all([
        dispatch(updateUserProfile(updatedData) as any),
        new Promise(resolve => setTimeout(resolve, 800)) // Minimum 800ms delay
      ])

      // Small delay to ensure Redux state has updated before exiting edit mode
      setTimeout(() => {
        setIsEditing(false)
      }, 50)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <div className="max-w-md">
      <Card className="overflow-hidden rounded-[2rem] relative">
        {/* Edit Button - Slides down when editing */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setIsEditing(true)}
                className={`absolute right-4 h-8 w-8 p-0 z-10 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out ${isEditing
                  ? 'top-14 bg-muted/80 dark:bg-muted/60 border-2 border-muted-foreground/30 dark:border-muted-foreground/50 text-muted-foreground dark:text-muted-foreground/80 cursor-not-allowed shadow-sm'
                  : 'top-4 bg-card border-2 border-border shadow-md hover:bg-accent hover:text-accent-foreground dark:hover:bg-jagged-ice-300'
                  }`}
                disabled={loading || isEditing}
              >
                <UserPen className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Cancel Button - Slides right to take edit button's place */}
        <Button
          variant="outline"
          onClick={handleCancel}
          className={`absolute top-4 h-8 w-8 p-0 z-10 rounded-lg hover:cursor-pointer transition-all duration-300 ease-in-out bg-card dark:hover:bg-red-400/80 dark:bg-red-300/70 border-2 border-red-200 text-red-700 shadow-md hover:bg-red-50 hover:text-red-700 hover:border-red-300 ${isEditing
            ? 'right-4 opacity-100 pointer-events-auto'
            : 'right-16 opacity-0 pointer-events-none'
            }`}
          disabled={loading}
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Banner Section */}
        <div className="relative h-46 bg-jagged-ice-500 rounded-[1.7rem] m-1.5">

          {/* Avatar positioned half on banner, half below */}
          <Avatar className="absolute bottom-6 left-6 translate-y-1/2 h-24 w-24 border-4 border-background shadow-lg rounded-full">
            <AvatarImage
              src={user.pfp_url || undefined}
              alt={user.name || user.email}
            />
            <AvatarFallback className="text-2xl font-bold bg-jagged-ice-100 text-jagged-ice-700 rounded-full flex items-center justify-center w-full h-full">
              {getInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardContent className="p-8 pt-0">
          <div className="relative overflow-hidden">
            {/* Edit Form - slides in from right */}
            <div className={`transition-all duration-500 ease-in-out ${isEditing
              ? 'translate-x-0 opacity-100'
              : 'translate-x-full opacity-0 absolute inset-0 pointer-events-none'
              }`}>
              <ProfileEditForm
                user={user}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            </div>

            {/* Profile View - slides out to left */}
            <div className={`transition-all duration-500 ease-in-out ${isEditing
              ? '-translate-x-full opacity-0 absolute inset-0 pointer-events-none'
              : 'translate-x-0 opacity-100'
              }`}>
              <div className="space-y-6">

                {/* Header with Name and Account Type */}
                <div className="flex items-start justify-between">
                  <div >
                    <h2 className="text-3xl font-bold wrap-anywhere">{user.name || user.email.split('@')[0].toLowerCase()}</h2>
                    <p className="text-muted-foreground text-md">{user.headline}</p>
                  </div>

                  {/* Account Type Badge - More prominent */}
                  {/* <TooltipProvider> */}
                  {/*   <Tooltip> */}
                  {/*     <TooltipTrigger asChild> */}
                  {/*       <AccountBadge accountType={user.account_type}> */}
                  {/*         {user.account_type?.toUpperCase() || "Not Set"} */}
                  {/*       </AccountBadge> */}
                  {/*     </TooltipTrigger> */}
                  {/*     <TooltipContent className="w-[12rem] text-center"> */}
                  {/*       <p className="wrap-normal"> */}
                  {/*         {user.account_type */}
                  {/*           ? "Account type helps personalise your experience" */}
                  {/*           : "We recommend setting your account type to optimise user experience as our algorithm takes into account the type of user you are" */}
                  {/*         } */}
                  {/*       </p> */}
                  {/*     </TooltipContent> */}
                  {/*   </Tooltip> */}
                  {/* </TooltipProvider> */}
                </div>

                {/* Professional Details Section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-muted-foreground uppercase tracking-wide">Details</h3>

                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className={`text-muted-foreground`}>{user.location || "Location Not Set"}</span>
                    </div>
                  </div>
                </div>

                {/* About Section */}
                <div className="space-y-2">
                  <h3 className="text-sm font-extrabold text-muted-foreground uppercase tracking-wide">Bio</h3>
                  <div className="relative">
                    <p
                      ref={bioRef}
                      className={`text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap max-h-[200px] overflow-y-auto break-words overflow-x-hidden`}
                    >
                      {user.bio || "Bio is not set."}
                    </p>
                    {showScrollIndicator && (
                      <div className="absolute bottom-2 right-2 flex items-center gap-1 text-xs dark:bg-havelock-blue-700 bg-havelock-blue-300 dark:text-white text-primary-foreground px-2 py-1 shadow-sm rounded-xl">
                        <ChevronDown className="h-3 w-3" />
                        <span>Scroll for more</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div >
  )
}

export default ProfileCard
