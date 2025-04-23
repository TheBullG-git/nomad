"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Calendar, Clock, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getSubscriptionPreference } from "@/lib/subscription-utils"

interface SubscriptionDetailsProps {
  booking: any
}

export function SubscriptionDetails({ booking }: SubscriptionDetailsProps) {
  const [preference, setPreference] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPreference() {
      if (!booking?.id) return

      try {
        const data = await getSubscriptionPreference(booking.id)
        setPreference(data)
      } catch (error) {
        console.error("Error fetching subscription preference:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPreference()
  }, [booking?.id])

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
      </Card>
    )
  }

  // Extract subscription type from notes
  const subscriptionType = booking.notes?.match(/Subscription Plan: (.*?),/)?.[1] || "Subscription"
  const schedulePreference = preference?.preference_type === "consistent" ? "Same time daily" : "Flexible scheduling"

  return (
    <Card>
      <CardHeader>
        <CardTitle>{subscriptionType}</CardTitle>
        <CardDescription>
          <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            Active Subscription
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Start Date: {format(new Date(booking.booking_date), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>Schedule: {schedulePreference}</span>
          </div>
          {preference?.preference_type === "consistent" && preference?.preferred_time && (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span>Preferred Time: {preference.preferred_time}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/bookings/${booking.id}`}>
            <Edit className="h-4 w-4 mr-2" />
            Manage Schedule
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
