import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/lib/supabase/database.types"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  try {
    const supabase = createMiddlewareClient<Database>({
      req,
      res,
    })

    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the user is authenticated
    const isAuthenticated = !!session
    const isAuthRoute = req.nextUrl.pathname.startsWith("/auth")
    const isDashboardRoute = req.nextUrl.pathname.startsWith("/dashboard")
    const isBookingRoute = req.nextUrl.pathname.startsWith("/booking") && req.nextUrl.pathname !== "/booking"
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")

    // Redirect unauthenticated users trying to access protected routes
    if (!isAuthenticated && (isDashboardRoute || isAdminRoute || isBookingRoute)) {
      const redirectUrl = new URL("/auth/sign-in", req.url)
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Redirect authenticated users away from auth routes
    if (isAuthenticated && isAuthRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Check if user is admin for admin routes
    if (isAuthenticated && isAdminRoute) {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        // Fetch user profile to check role
        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user?.id).single()

        if (profile?.role !== "admin") {
          return NextResponse.redirect(new URL("/dashboard", req.url))
        }
      } catch (error) {
        console.error("Error checking admin status:", error)
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }
  } catch (error) {
    console.error("Middleware error:", error)
    // On error, allow the request to proceed to avoid blocking navigation
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/auth/:path*", "/booking/confirmation", "/booking/history"],
}
