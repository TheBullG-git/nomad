"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calendar, Dumbbell, Home, LogOut, Settings, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/auth-context"

export function AdminSidebar() {
  const pathname = usePathname()
  const { signOut } = useAuth()

  const routes = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: Home,
    },
    {
      href: "/admin/users",
      label: "Users",
      icon: Users,
    },
    {
      href: "/admin/bookings",
      label: "Bookings",
      icon: Calendar,
    },
    {
      href: "/admin/services",
      label: "Services",
      icon: Dumbbell,
    },
    {
      href: "/admin/trucks",
      label: "Truck Fleet",
      icon: Truck,
    },
    {
      href: "/admin/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <Dumbbell className="h-6 w-6 text-purple-400" />
        <span className="text-xl font-bold">Admin Panel</span>
      </div>

      <nav className="space-y-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
              pathname === route.href ? "bg-purple-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-8">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
