import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { OrderList } from "@/components/orders/order-list"

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  // Check if user is admin
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

  if (profile?.role !== "admin") {
    redirect("/dashboard")
  }

  // Build query with filters
  let query = supabase
    .from("bookings")
    .select(`
      *,
      profiles:user_id (first_name, last_name),
      services:service_id (name)
    `)
    .order("booking_date", { ascending: false })

  // Apply status filter if provided - using type assertion to fix the TypeScript error
  if (searchParams.status && searchParams.status !== "all") {
    // Use type assertion to tell TypeScript that this is a valid status value
    query = query.eq("status", searchParams.status as any)
  }

  const { data: bookings, error } = await query

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">Manage all customer orders</p>
      </div>

      <div className="grid gap-8">
        {error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-700">Error loading orders: {error.message}</p>
          </div>
        ) : (
          <OrderList orders={bookings || []} isAdmin={true} />
        )}
      </div>
    </div>
  )
}
