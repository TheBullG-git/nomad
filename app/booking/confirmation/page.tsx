"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSoundEffects } from "@/hooks/use-sound-effects"

export default function BookingConfirmationPage() {
  const [soundPlayed, setSoundPlayed] = useState(false)
  const { playSound } = useSoundEffects()

  useEffect(() => {
    if (!soundPlayed) {
      // Play the booking confirmed sound
      playSound("booking-confirmed")
      setSoundPlayed(true)
    }
  }, [playSound, soundPlayed])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-card rounded-lg shadow-lg p-8 border border-border"
      >
        <div className="flex flex-col items-center text-center">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted-foreground mb-6">Your mobile gym session has been successfully scheduled.</p>

          <div className="bg-muted p-4 rounded-md w-full mb-6">
            <div className="flex items-start mb-3">
              <Calendar className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Booking Details</p>
                <p className="text-sm text-muted-foreground">
                  We've sent a confirmation email with all the details of your booking.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <Button asChild className="flex-1">
              <Link href="/">Return to Home</Link>
            </Button>

            <Button asChild variant="outline" className="flex-1">
              <Link href="/booking">Book Another Session</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
