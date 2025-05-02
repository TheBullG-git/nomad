"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CheckCircle2, ArrowLeft, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBackground } from "@/components/animated-background"

interface BookingData {
  service: string
  plan: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  location: string
  message: string
}

export default function BookingConfirmationPage() {
  const router = useRouter()
  const [bookingId, setBookingId] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<BookingData | null>(null)

  useEffect(() => {
    // Get booking ID from session storage
    const storedBookingId = sessionStorage.getItem("lastBookingId")
    if (storedBookingId) {
      setBookingId(storedBookingId)
    }

    // Get booking data from session storage
    const storedBookingData = sessionStorage.getItem("bookingData")
    if (storedBookingData) {
      try {
        const parsedData = JSON.parse(storedBookingData)
        setBookingData(parsedData)
      } catch (error) {
        console.error("Error parsing booking data:", error)
      }
    }
  }, [])

  const handleBackToHome = () => {
    router.push("/")
  }

  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="mx-auto max-w-2xl">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 md:h-20 md:w-20 text-[#FF7F24]" />
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground">
              Your booking has been successfully submitted. We'll contact you shortly to confirm the details.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-border">
                    <h2 className="text-lg md:text-xl font-semibold">Booking Details</h2>
                    <div className="bg-[#8B4513]/10 text-[#8B4513] px-3 py-1 rounded-full text-sm font-medium">
                      {bookingId || "Pending"}
                    </div>
                  </div>

                  {bookingData && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Service</p>
                          <p className="font-medium">
                            {bookingData.service === "gym" ? "Mobile Gym" : "Yoga and Dance"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Plan</p>
                          <p className="font-medium capitalize">{bookingData.plan}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Customer</p>
                        <p className="font-medium">{bookingData.name}</p>
                        <p className="text-sm">{bookingData.email}</p>
                        <p className="text-sm">{bookingData.phone}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Calendar className="h-4 w-4 mr-2 mt-0.5 text-[#FF7F24]" />
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">
                              {bookingData.date ? new Date(bookingData.date).toLocaleDateString() : "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Clock className="h-4 w-4 mr-2 mt-0.5 text-[#FF7F24]" />
                          <div>
                            <p className="text-sm text-muted-foreground">Time</p>
                            <p className="font-medium">
                              {bookingData.time
                                ? new Date(`2000-01-01T${bookingData.time}`).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : "Not specified"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 mr-2 mt-0.5 text-[#FF7F24]" />
                          <div>
                            <p className="text-sm text-muted-foreground">Location</p>
                            <p className="font-medium">{bookingData.location}</p>
                          </div>
                        </div>
                      </div>

                      {bookingData.message && (
                        <div>
                          <p className="text-sm text-muted-foreground">Additional Information</p>
                          <p className="text-sm">{bookingData.message}</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to your email address. If you have any questions, please
                      contact us at <span className="text-[#FF7F24]">support@nomadfitness.com</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button
              onClick={handleBackToHome}
              variant="outline"
              className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
