import { LoaderIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex justify-center py-40">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className="size-12 animate-spin text-neutral-600/80"
      />
    </div>
  )
}
