"use client"

import { Calendar } from "@/components/ui/calendar"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CalendarIcon, Check, Dumbbell, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { LocationBadge } from "@/components/location-badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Only the mobile gym service
const mobileGymService = {
  id: "mobile-gym",
  title: "Mobile Gym Session",
  description: "One-on-one training in our fully-equipped mobile gym truck.",
  icon: Dumbbell,
  duration: "60 min",
}

const timeSlots = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
  "7:00 PM",
]

// Available plans
const plans = [
  {
    id: "single-session",
    name: "Single Session",
    price: 300,
    description: "One-time mobile gym session",
  },
  {
    id: "monthly",
    name: "Monthly Plan",
    price: 7000,
    description: "12 sessions per month (3 per week)",
  },
  {
    id: "quarterly",
    name: "Quarterly Plan",
    price: 15000,
    description: "36 sessions over 3 months",
  },
  {
    id: "yearly",
    name: "Yearly Plan",
    price: 25000,
    description: "144 sessions over 12 months",
  },
]

export default function BookingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: undefined as Date | undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    plan: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (isStepComplete()) {
      setStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    } else {
      toast({
        title: "Please complete all fields",
        description: "All required fields must be filled before proceeding.",
        variant: "destructive",
      })
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Store booking data in session storage for confirmation page
      sessionStorage.setItem("bookingData", JSON.stringify(formData))

      // Submit the booking data to your API
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to submit booking")
      }

      const data = await response.json()

      // Navigate to confirmation page
      toast({
        title: "Booking successful!",
        description: "Your session has been booked successfully.",
      })

      // Store the booking ID in session storage
      if (data.bookingId) {
        sessionStorage.setItem("lastBookingId", data.bookingId)
      }

      router.push("/booking/confirmation")
    } catch (error: any) {
      console.error("Error creating booking:", error)
      toast({
        title: "Booking failed",
        description: error.message || "There was an error creating your booking. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!formData.date && !!formData.time
      case 2:
        return !!formData.plan
      case 3:
        return !!formData.name && !!formData.email && !!formData.phone && !!formData.address
      default:
        return true
    }
  }

  const selectedPlan = plans.find((plan) => plan.id === formData.plan)

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Book Your Mobile Gym Session</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Complete the form below to schedule your mobile gym experience.
        </p>
        <div className="mt-2 flex justify-center">
          <LocationBadge />
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto">
        <Alert className="mb-6 border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-900/50">
          <MapPin className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <AlertTitle>Service Area Notice</AlertTitle>
          <AlertDescription>
            Please note that NomadFitness currently serves Rajkot, Gujarat area only. Please ensure your location is
            within our service area before booking.
          </AlertDescription>
        </Alert>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium",
                    step === i
                      ? "bg-purple-600 text-white"
                      : step > i
                        ? "bg-purple-200 text-purple-700 dark:bg-purple-900 dark:text-purple-300"
                        : "bg-muted text-muted-foreground",
                  )}
                >
                  {i}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">
                  {i === 1 ? "Schedule" : i === 2 ? "Plan" : i === 3 ? "Details" : "Confirm"}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className={`h-1 rounded-l-full ${step > 1 ? "bg-purple-600" : "bg-muted"}`} />
            <div className={`h-1 ${step > 2 ? "bg-purple-600" : "bg-muted"}`} />
            <div className={`h-1 rounded-r-full ${step > 3 ? "bg-purple-600" : "bg-muted"}`} />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1
                ? "Choose Date & Time"
                : step === 2
                  ? "Select a Plan"
                  : step === 3
                    ? "Your Details"
                    : "Confirm Booking"}
            </CardTitle>
            <CardDescription>
              {step === 1
                ? "Select a convenient date and time for your mobile gym session"
                : step === 2
                  ? "Choose a plan that fits your fitness goals"
                  : step === 3
                    ? "Provide your contact and location information"
                    : "Review your booking details before confirming"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.date ? format(formData.date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.date}
                          onSelect={(date) => updateFormData("date", date)}
                          initialFocus
                          disabled={(date) => {
                            // Only allow booking for today or future dates
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return date < today
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <Select value={formData.time} onValueChange={(value) => updateFormData("time", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {plans.map((plan) => (
                      <div
                        key={plan.id}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-colors",
                          formData.plan === plan.id
                            ? "border-purple-600 bg-purple-50 dark:bg-purple-900/20"
                            : "hover:border-purple-200 hover:bg-purple-50/50 dark:hover:bg-purple-900/10",
                        )}
                        onClick={() => updateFormData("plan", plan.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground">{plan.description}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold">₹{plan.price.toLocaleString()}</span>
                            {formData.plan === plan.id && (
                              <div className="h-5 w-5 rounded-full bg-purple-600 flex items-center justify-center mt-1">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateFormData("phone", e.target.value)}
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => updateFormData("address", e.target.value)}
                      placeholder="123 Main St, City, State, Zip"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      This is where our mobile gym truck will arrive for your session.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => updateFormData("notes", e.target.value)}
                      placeholder="Any special requests or information we should know?"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Booking Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Service:</span>
                        <span className="font-medium">{mobileGymService.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan:</span>
                        <span className="font-medium">{selectedPlan?.name || ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">₹{selectedPlan?.price.toLocaleString() || ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{formData.date ? format(formData.date, "PPP") : ""}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{formData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{formData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{formData.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                {step > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {step < 4 ? (
                  <Button type="button" className="ml-auto bg-purple-600 hover:bg-purple-700" onClick={nextStep}>
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto bg-purple-600 hover:bg-purple-700" disabled={isSubmitting}>
                    {isSubmitting ? "Booking..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
