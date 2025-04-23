import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Edit, Filter, Plus, Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default async function BookingsPage({
  searchParams,
}: {
  searchParams: { status?: string }
}) {
  const supabase = createClient()

  // Build query with filters
  let query = supabase
    .from("bookings")
    .select(`
      *,
      profiles:user_id (first_name, last_name),
      services:service_id (name)
    `)
    .order("booking_date", { ascending: false })

  // Apply status filter if provided
  if (searchParams.status) {
    query = query.eq("status", searchParams.status)
  }

  const { data: bookings } = await query

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bookings Management</h1>
          <p className="text-muted-foreground">Manage all client bookings and sessions.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Booking
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>All Bookings</CardTitle>
            <div className="flex gap-4">
              <div className="flex items-center relative">
                <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
                <Input placeholder="Search bookings..." className="pl-9 w-[250px]" />
              </div>
              <Select defaultValue={searchParams.status || "all"}>
                <SelectTrigger className="w-[180px]">
                  <div className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Client</th>
                  <th className="text-left py-3 px-4 font-medium">Service</th>
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-left py-3 px-4 font-medium">Location</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-4">
                      {booking.profiles?.first_name} {booking.profiles?.last_name}
                    </td>
                    <td className="py-3 px-4">{booking.services?.name || "N/A"}</td>
                    <td className="py-3 px-4">{new Date(booking.booking_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      {booking.start_time} - {booking.end_time}
                    </td>
                    <td className="py-3 px-4 max-w-[200px] truncate">{booking.location}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        {booking.status === "pending" && (
                          <>
                            <Button variant="outline" size="sm" className="text-green-500 hover:text-green-600">
                              <Check className="h-4 w-4" />
                              <span className="sr-only">Confirm</span>
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                              <X className="h-4 w-4" />
                              <span className="sr-only">Reject</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {(!bookings || bookings.length === 0) && (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-muted-foreground">
                      No bookings found
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
