import { Badge } from "../ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

export type AccountBadgeProps = {
  children: React.ReactNode
  accountType: string | undefined
}

const AccountBadge = ({ children, accountType }: AccountBadgeProps) => {
  const getBadgeStyle = () => {
    switch (accountType?.toLowerCase()) {
      case "investor":
        return "bg-jagged-ice-200 text-jagged-ice-800"
      case "founder":
        return "bg-havelock-blue-200 text-havelock-blue-800"
      case "talent":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-red-100 text-red-800"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={`${getBadgeStyle()} border-0 px-4 py-2 text-sm font-bold rounded-full cursor-help`}>
            {children}
          </Badge>
        </TooltipTrigger>
        <TooltipContent className="w-[12rem] text-center">
          <p className="wrap-normal">
            {accountType
              ? "Account type helps personalise your experience"
              : "We recommend setting your account type to optimise user experience as our algorithm takes into account the type of user you are"
            }
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default AccountBadge
