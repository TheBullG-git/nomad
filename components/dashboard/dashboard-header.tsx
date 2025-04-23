import type React from "react"
interface DashboardHeaderProps {
  heading: string
  text?: string
  profile?: any
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, profile, children }: DashboardHeaderProps) {
  return (
    <div className="flex flex-col gap-1 mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-muted-foreground">{text}</p>}
      {profile && (
        <p className="text-muted-foreground">
          {profile.first_name ? `Hello, ${profile.first_name}!` : "Complete your profile to get started."}
        </p>
      )}
      {children}
    </div>
  )
}
