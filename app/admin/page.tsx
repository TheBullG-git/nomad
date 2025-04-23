import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Dumbbell, Truck, Users } from "lucide-react"
import { DemoCredentials } from "@/components/admin/demo-credentials"

export default async function AdminDashboardPage() {
  const supabase = createClient()

  // Fetch counts from different tables
  const [{ count: userCount }, { count: bookingCount }, { count: serviceCount }, { count: truckCount }] =
    await Promise.all([
      supabase.from("profiles").select("*", { count: "exact", head: true }),
      supabase.from("bookings").select("*", { count: "exact", head: true }),
      supabase.from("services").select("*", { count: "exact", head: true }),
      supabase.from("truck_fleet").select("*", { count: "exact", head: true }),
    ])

  // Fetch recent bookings
  const { data: recentBookings } = await supabase
    .from("bookings")
    .select(`
      *,
      profiles:user_id (first_name, last_name),
      services:service_id (name)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  const stats = [
    {
      title: "Total Users",
      value: userCount || 0,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Bookings",
      value: bookingCount || 0,
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Active Services",
      value: serviceCount || 0,
      icon: Dumbbell,
      color: "bg-purple-500",
    },
    {
      title: "Truck Fleet",
      value: truckCount || 0,
      icon: Truck,
      color: "bg-orange-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the NomadFitness admin panel. Manage your users, bookings, services, and more.
        </p>
      </div>

      {/* Demo Credentials */}
      <DemoCredentials />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Client</th>
                  <th className="text-left py-3 px-4 font-medium">Service</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings?.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-4">
                      {booking.profiles?.first_name} {booking.profiles?.last_name}
                    </td>
                    <td className="py-3 px-4">{booking.services?.name || "N/A"}</td>
                    <td className="py-3 px-4">{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!recentBookings || recentBookings.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-4 text-center text-muted-foreground">
                      No recent bookings found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
