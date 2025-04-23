import { MapPin } from "lucide-react"

interface LocationBadgeProps {
  className?: string
  variant?: "default" | "subtle" | "outline"
}

export function LocationBadge({ className, variant = "default" }: LocationBadgeProps) {
  const baseStyles = "inline-flex items-center gap-1 rounded-full text-sm font-medium"

  const variantStyles = {
    default: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 px-3 py-1",
    subtle: "text-muted-foreground",
    outline: "border border-purple-200 dark:border-purple-800 px-3 py-1",
  }

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      <MapPin className="h-3.5 w-3.5" />
      <span>Serving Rajkot, Gujarat Only</span>
    </div>
  )
}
