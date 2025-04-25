"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import { SoundToggle } from "@/components/sound-toggle"

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams()
  const { playSound } = useSoundEffects()

  const [bookingId, setBookingId] = useState<string | null>(null)

  useEffect(() => {
    // Play booking confirmed sound when the component mounts
    const playSounds = async () => {
      try {
        // Play the new booking confirmed sound
        playSound("booking-confirmed")
      } catch (error) {
        console.error("Error playing sounds:", error)
      }
    }

    playSounds()

    // Try to get booking ID from URL params first
    const urlBookingId = searchParams.get("bookingId")

    if (urlBookingId) {
      setBookingId(urlBookingId)
    } else {
      // If not in URL, try to get from sessionStorage
      const storedBookingId = sessionStorage.getItem("lastBookingId")
      if (storedBookingId) {
        setBookingId(storedBookingId)
        // Clear it after retrieving
        sessionStorage.removeItem("lastBookingId")
      }
    }
  }, [playSound, searchParams])

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <div className="mb-6 flex justify-center">
          <CheckCircle className="h-16 w-16 text-primary" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-foreground">Booking Confirmed!</h1>
        <p className="mb-6 text-lg text-muted-foreground">
          Thank you for booking with NomadFitness. We have received your request and will contact you shortly to confirm
          the details.
          {bookingId && <span className="block mt-2 font-medium">Booking Reference: {bookingId}</span>}
        </p>
        <div className="mb-8 rounded-lg bg-muted p-6 text-left">
          <h2 className="mb-4 text-xl font-semibold text-foreground">What happens next?</h2>
          <ol className="space-y-2 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                1
              </span>
              <span>Our team will review your booking request.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                2
              </span>
              <span>You will receive a confirmation email with all the details.</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                3
              </span>
              <span>Our fitness team will arrive at your location at the scheduled time.</span>
            </li>
          </ol>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => playSound("click")}
            asChild
          >
            <Link href="/">Return to Home</Link>
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => playSound("click")}
            asChild
          >
            <Link href="/services">Explore More Services</Link>
          </Button>
        </div>
      </div>
      <SoundToggle />
    </div>
  )
}
