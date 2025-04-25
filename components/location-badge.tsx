import { MapPin } from "lucide-react"

interface LocationBadgeProps {
  className?: string
  variant?: "default" | "subtle" | "outline"
}

export function LocationBadge({ className, variant = "default" }: LocationBadgeProps) {
  const baseStyles = "inline-flex items-center gap-1 rounded-full text-sm font-medium"

  const getVariantStyles = (variant: string) => {
    switch (variant) {
      case "default":
        return "bg-[#ce8521]/10 text-[#ce8521] dark:bg-[#ce8521]/20 dark:text-[#ce8521] px-3 py-1"
      case "subtle":
        return "text-muted-foreground"
      case "outline":
        return "border border-[#ce8521]/20 dark:border-[#ce8521]/30 px-3 py-1"
      default:
        return "bg-[#ce8521]/10 text-[#ce8521] dark:bg-[#ce8521]/20 dark:text-[#ce8521] px-3 py-1"
    }
  }

  return (
    <div className={`${baseStyles} ${getVariantStyles(variant)} ${className}`}>
      <MapPin className="h-3.5 w-3.5" />
      <span>Serving Rajkot, Gujarat Only</span>
    </div>
  )
}
