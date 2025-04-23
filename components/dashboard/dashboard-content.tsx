"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Clock, Dumbbell, MapPin, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"
import { SubscriptionDetails } from "./subscription-details"
import { EnvDebug } from "./env-debug" // Import the debug component

interface DashboardContentProps {
  userId: string
}

export function DashboardContent({ userId }: DashboardContentProps) {
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([])
  const [activeSubscriptions, setActiveSubscriptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    async function fetchData() {
      try {
        const today = new Date().toISOString().split("T")[0]

        // Fetch upcoming bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select(`
            *,
            services:service_id (name, duration)
          `)
          .eq("user_id", userId)
          .gte("booking_date", today)
          .order("booking_date", { ascending: true })
          .order("start_time", { ascending: true })
          .limit(3)

        if (bookingsError) throw bookingsError

        // Process the data to identify subscription bookings
        const processedBookings =
          bookingsData?.map((booking) => {
            const isSubscription = booking.notes?.includes("Subscription Plan")
            return {
              ...booking,
              isSubscription,
              subscriptionType: isSubscription
                ? booking.notes?.match(/Subscription Plan: (.*?),/)?.[1] || "Monthly Plan"
                : null,
              schedulePreference: isSubscription
                ? booking.notes?.includes("Preference: Same time daily")
                  ? "Same time daily"
                  : "Flexible scheduling"
                : null,
            }
          }) || []

        setUpcomingBookings(processedBookings)

        // Find active subscriptions
        const subscriptions = processedBookings.filter((booking) => booking.isSubscription)
        setActiveSubscriptions(subscriptions)
      } catch (error: any) {
        console.error("Error fetching data:", error)
        setConnectionError(error.message || "Failed to connect to database")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userId, supabase])

  return (
    <div className="grid gap-8">
      {/* Debug section - only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <section>
          <EnvDebug />
        </section>
      )}

      {/* Connection error alert */}
      {connectionError && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-red-100 p-1 dark:bg-red-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-600 dark:text-red-400"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-red-800 dark:text-red-300">Database Connection Error</h3>
                <p className="text-sm text-red-700 dark:text-red-400">{connectionError}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Subscriptions Section */}
      {activeSubscriptions.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Active Subscriptions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSubscriptions.map((subscription) => (
              <SubscriptionDetails key={subscription.id} booking={subscription} />
            ))}
          </div>
        </section>
      )}

      {/* Upcoming Sessions Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/bookings">View all</Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : upcomingBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingBookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle>{booking.services?.name || "Session"}</CardTitle>
                  <CardDescription>
                    {booking.status === "confirmed" ? (
                      <span className="text-green-600 dark:text-green-400">Confirmed</span>
                    ) : booking.status === "pending" ? (
                      <span className="text-yellow-600 dark:text-yellow-400">Pending</span>
                    ) : (
                      <span>{booking.status}</span>
                    )}
                    {booking.isSubscription && (
                      <span className="ml-2 inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                        Subscription
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{format(new Date(booking.booking_date), "EEEE, MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
                      </span>
                    </div>
                    {booking.isSubscription && (
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {booking.subscriptionType} - {booking.schedulePreference}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{booking.location}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 border-t">
                  <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/bookings/${booking.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Dumbbell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">No upcoming sessions</h3>
              <p className="text-muted-foreground mb-4">You don't have any upcoming fitness sessions scheduled.</p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/booking">Book a Session</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Calendar className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-medium mb-2">Book a Session</h3>
              <p className="text-muted-foreground text-sm mb-4">Schedule your next workout with our mobile gym.</p>
              <Button asChild className="bg-purple-600 hover:bg-purple-700">
                <Link href="/booking">Book Now</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <Dumbbell className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-medium mb-2">Track Progress</h3>
              <p className="text-muted-foreground text-sm mb-4">Update and monitor your fitness statistics.</p>
              <Button asChild variant="outline">
                <Link href="/dashboard/fitness">View Stats</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center text-center">
              <User className="h-8 w-8 text-purple-600 mb-4" />
              <h3 className="font-medium mb-2">Update Profile</h3>
              <p className="text-muted-foreground text-sm mb-4">Keep your personal information up to date.</p>
              <Button asChild variant="outline">
                <Link href="/dashboard/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
