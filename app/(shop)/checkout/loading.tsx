import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-36" />
        <div className="h-5">
          <Skeleton className="h-4 w-4/5" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-1/3" />
            <Skeleton className="h-9 w-full" />
          </div>
        ))}
      </CardContent>
      <CardFooter className="justify-end">
        <Skeleton className="h-9 w-16" />
      </CardFooter>
    </Card>
  )
}
