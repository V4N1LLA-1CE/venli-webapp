import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function ProfileCardSkeleton() {
  return (
    <div className="max-w-lg">
      <Card className="overflow-hidden rounded-[2rem] relative">
        {/* Edit Button Skeleton */}
        <Skeleton className="absolute top-4 right-4 h-8 w-8 rounded-lg z-10" />

        {/* Banner Section */}
        <div className="relative h-42 bg-jagged-ice-500/10 rounded-[1.7rem] m-1.5">
          {/* Avatar positioned half on banner, half below */}
          <Skeleton className="absolute bottom-6 left-6 translate-y-1/2 h-24 w-24 rounded-full border-4 border-background" />
        </div>

        <CardContent className="p-8 pt-0">
          <div className="space-y-6">
            {/* Header with Name and Account Type */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-64" />
              </div>
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            {/* Details Section */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-8" />
              <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}