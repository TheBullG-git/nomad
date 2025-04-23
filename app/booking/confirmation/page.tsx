"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function ConfirmationPage() {
  const router = useRouter()

  // In a real implementation, we would fetch the booking details from Supabase
  // For now, we'll just simulate a successful booking

  useEffect(() => {
    // If the user navigates directly to this page without completing the booking form,
    // redirect them to the booking page
    const hasBookingData = sessionStorage.getItem("bookingData")
    if (!hasBookingData) {
      router.push("/booking")
    }
  }, [router])

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-6 flex justify-center"
        >
          <CheckCircle2 className="h-24 w-24 text-green-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
              <CardDescription>Your mobile gym session has been successfully scheduled.</CardDescription>
            </CardHeader>
            <CardContent className="text-left">
              <p className="mb-4">
                We've sent a confirmation email with all the details to your email address. Our team will contact you
                shortly to confirm your booking.
              </p>
              <div className="rounded-lg bg-muted p-4">
                <h3 className="font-medium mb-2">What's Next?</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>Our team will call you to confirm your booking details</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>We'll arrive at your location 15 minutes before your session</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                    <span>Wear comfortable workout clothes and bring a water bottle</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/">Return to Home</Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
