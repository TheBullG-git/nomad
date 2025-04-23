import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function middleware(request: NextRequest) {
  // Add security headers
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")

  try {
    // For paths that should be protected (require authentication)
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/booking/confirmation")
    ) {
      const supabase = createClient()
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        // Redirect to login
        return NextResponse.redirect(new URL("/auth/sign-in", request.url))
      }
    }

    return response
  } catch (error) {
    console.error("Middleware error:", error)
    return response
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/dashboard/:path*",
    "/booking/confirmation",
  ],
}
