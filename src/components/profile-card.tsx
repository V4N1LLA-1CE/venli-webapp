import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { Card, CardContent } from "./ui/card"
import { User } from "@/types"
import { MapPin } from "lucide-react"
import { Badge } from "./ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const ProfileCard = ({ user }: { user: User }) => {
  return (
    <div className="max-w-lg ">
      <Card className="overflow-hidden rounded-[1.4rem]">
        {/* Banner Section */}
        <div className="relative h-38 bg-jagged-ice-500 rounded-[1.3rem] m-1.5 flex items-center justify-center">

          {/* Avatar positioned half on banner, half below */}
          <Avatar className="absolute bottom-3 translate-y-1/2 h-28 w-28 border-4 border-background shadow-lg rounded-full">
            <AvatarImage src={user.profileImage || undefined} alt={user.name || user.email} />
            <AvatarFallback className="text-2xl font-bold bg-jagged-ice-100 text-jagged-ice-700 rounded-full flex items-center justify-center w-full h-full">
              {getInitials(user.name || user.email)}
            </AvatarFallback>
          </Avatar>
        </div>

        <CardContent className="px-[4rem] pb-4 pt-4 ">
          <div className="flex flex-col justify-center items-center gap-6">
            {/* Header with Name and Account Type */}

            <div className="flex flex-col gap-4 items-center justify-center text-center">
              <div >
                <h2 className="text-3xl font-semibold">{user.name || user.email.split('@')[0]}</h2>
                <p className="text-muted-foreground text-md font-light">{user.headline}</p>
              </div>

              <div>
                {/* Account Type Badge - More prominent */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className={`${user.accountType ? "bg-jagged-ice-200 text-jagged-ice-800 " : "bg-red-100 text-red-800 "} border-0 px-4 py-2 text-sm font-bold shadow-sm rounded-full cursor-help`}>
                        {user.accountType || "Account Type Not Set"}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent >
                      <p className="max-w-3xs text-center">
                        {user.accountType
                          ? "Account type helps personalise your experience"
                          : "We recommend setting your account type to optimise user experience as our algorithm takes into account the type of user you are"
                        }
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

            </div>


            {/* Professional Details Section */}
            <div className="flex flex-col items-center justify-center text-center">
              {/* About Section */}
              <div className="space-y-3">
                <p className={`text-sm text-muted-foreground leading-relaxed`}>
                  {user.bio || "Bio is not set."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              {/* <div className="flex items-center gap-2"> */}
              {/*   <Building className="h-4 w-4 text-muted-foreground" /> */}
              {/*   <span className={`${user.company ? "text-foreground" : "text-muted-foreground"}`} >{user.company || "Not Set"}</span> */}
              {/* </div> */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className={`text-muted-foreground`}>{user.location || "Not Set"}</span>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>
    </div >
  )
}

export default ProfileCard
