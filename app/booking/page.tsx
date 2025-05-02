"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Check, Dumbbell, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AnimatedBackground } from "@/components/animated-background"

const STEPS = {
  SERVICE_SELECTION: 0,
  PLAN_SELECTION: 1,
  PERSONAL_INFO: 2,
  BOOKING_DETAILS: 3,
}

export default function BookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialService = searchParams.get("service") || ""

  const [step, setStep] = useState(STEPS.SERVICE_SELECTION)
  const [loading, setLoading] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [formData, setFormData] = useState({
    service: initialService,
    plan: "",
    name: "",
    email: "",
    location: "",
    date: undefined as Date | undefined,
    time: "",
    message: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFallbackSubmission = () => {
    // Generate a local booking ID
    const localBookingId = `LOCAL-${Date.now().toString().slice(-6)}`

    // Store booking data in session storage
    sessionStorage.setItem("lastBookingId", localBookingId)
    sessionStorage.setItem("bookingData", JSON.stringify(formData))

    // Navigate to confirmation page
    router.push("/booking/confirmation")
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Store the booking ID in session storage for the confirmation page
        if (data.bookingId) {
          sessionStorage.setItem("lastBookingId", data.bookingId)
        }
        router.push("/booking/confirmation")
      } else {
        console.error("Booking submission failed:", data.message || "Unknown error")
        alert(data.message || "There was an error submitting your booking. Please try again.")
        handleFallbackSubmission()
      }
    } catch (error) {
      console.error("Error submitting booking:", error)
      alert("There was an error connecting to the server. Please try again later.")
      handleFallbackSubmission()
    } finally {
      setLoading(false)
    }
  }

  // Handle date selection and close calendar
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      updateFormData("date", date)
      setCalendarOpen(false) // Close the calendar after selection
    }
  }

  const renderServiceSelection = () => (
    <motion.div
      className="space-y-4 md:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="mb-2 md:mb-4 text-xl md:text-2xl font-bold text-foreground">Select a Service</h2>
        <p className="text-muted-foreground text-sm md:text-base">Choose the type of service you're interested in.</p>
      </div>
      <RadioGroup
        value={formData.service}
        onValueChange={(value) => updateFormData("service", value)}
        className="grid gap-4 md:grid-cols-2"
      >
        <div>
          <RadioGroupItem value="gym" id="gym" className="peer sr-only" />
          <Label
            htmlFor="gym"
            className="flex cursor-pointer flex-col rounded-lg border border-border bg-card p-4 md:p-6 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#FF7F24]/10 p-2 md:p-3 rounded-full mr-3">
                <Dumbbell className="h-5 w-5 md:h-6 md:w-6 text-[#FF7F24]" />
              </div>
              <span className="text-base md:text-lg font-medium text-foreground">Mobile Gym</span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Full access to our mobile gym equipment and personal training
            </span>
          </Label>
        </div>
        <div>
          <RadioGroupItem value="yoga" id="yoga" className="peer sr-only" />
          <Label
            htmlFor="yoga"
            className="flex cursor-pointer flex-col rounded-lg border border-border bg-card p-4 md:p-6 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
          >
            <div className="flex items-center mb-4">
              <div className="bg-[#FF7F24]/10 p-2 md:p-3 rounded-full mr-3">
                <Music className="h-5 w-5 md:h-6 md:w-6 text-[#FF7F24]" />
              </div>
              <span className="text-base md:text-lg font-medium text-foreground">Yoga and Dance</span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground">
              Professional yoga and dance instruction at your location
            </span>
          </Label>
        </div>
      </RadioGroup>
    </motion.div>
  )

  const renderPlanSelection = () => (
    <motion.div
      className="space-y-4 md:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="mb-2 md:mb-4 text-xl md:text-2xl font-bold text-foreground">Select a Plan</h2>
        <p className="text-muted-foreground text-sm md:text-base">Choose the plan that works best for you.</p>
      </div>
      <RadioGroup value={formData.plan} onValueChange={(value) => updateFormData("plan", value)} className="grid gap-4">
        {formData.service === "gym" ? (
          <>
            <div>
              <RadioGroupItem value="single" id="single-gym" className="peer sr-only" />
              <Label
                htmlFor="single-gym"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Single Session</span>
                  <p className="text-xs md:text-sm text-muted-foreground">One hour of gym training</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹300</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="monthly" id="monthly-gym" className="peer sr-only" />
              <Label
                htmlFor="monthly-gym"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Monthly</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for one month</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹7,000</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="quarterly" id="quarterly-gym" className="peer sr-only" />
              <Label
                htmlFor="quarterly-gym"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Quarterly</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for three months</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹12,000</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="biannual" id="biannual-gym" className="peer sr-only" />
              <Label
                htmlFor="biannual-gym"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Biannual</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for six months</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹20,000</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="annual" id="annual-gym" className="peer sr-only" />
              <Label
                htmlFor="annual-gym"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Annual</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for one year</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹25,000</span>
              </Label>
            </div>
          </>
        ) : (
          <>
            <div>
              <RadioGroupItem value="single" id="single-yoga" className="peer sr-only" />
              <Label
                htmlFor="single-yoga"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Single Session</span>
                  <p className="text-xs md:text-sm text-muted-foreground">One hour of yoga or dance</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹200</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="monthly" id="monthly-yoga" className="peer sr-only" />
              <Label
                htmlFor="monthly-yoga"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Monthly</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for one month</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹4,000</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="quarterly" id="quarterly-yoga" className="peer sr-only" />
              <Label
                htmlFor="quarterly-yoga"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Quarterly</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for three months</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹8,000</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="biannual" id="biannual-yoga" className="peer sr-only" />
              <Label
                htmlFor="biannual-yoga"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Biannual</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for six months</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹12,000</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem value="annual" id="annual-yoga" className="peer sr-only" />
              <Label
                htmlFor="annual-yoga"
                className="flex cursor-pointer items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted peer-data-[state=checked]:border-[#FF7F24] peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-[#FF7F24]"
              >
                <div>
                  <span className="text-base md:text-lg font-medium text-foreground">Annual</span>
                  <p className="text-xs md:text-sm text-muted-foreground">Regular sessions for one year</p>
                </div>
                <span className="text-base md:text-lg font-bold text-[#FF7F24]">₹18,000</span>
              </Label>
            </div>
          </>
        )}
      </RadioGroup>
    </motion.div>
  )

  const renderPersonalInfo = () => (
    <motion.div
      className="space-y-4 md:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="mb-2 md:mb-4 text-xl md:text-2xl font-bold text-foreground">Personal Information</h2>
        <p className="text-muted-foreground text-sm md:text-base">Please provide your contact details.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground text-sm md:text-base">
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            placeholder="John Doe"
            className="bg-background text-foreground"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground text-sm md:text-base">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData("email", e.target.value)}
            placeholder="john@example.com"
            className="bg-background text-foreground"
            required
          />
        </div>
      </div>
    </motion.div>
  )

  const renderBookingDetails = () => (
    <motion.div
      className="space-y-4 md:space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="mb-2 md:mb-4 text-xl md:text-2xl font-bold text-foreground">Booking Details</h2>
        <p className="text-muted-foreground text-sm md:text-base">Select your preferred date, time, and location.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-foreground text-sm md:text-base">Date</Label>
          <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !formData.date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={formData.date} onSelect={handleDateSelect} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="time" className="text-foreground text-sm md:text-base">
            Time
          </Label>
          <Select value={formData.time} onValueChange={(value) => updateFormData("time", value)}>
            <SelectTrigger className="bg-background text-foreground">
              <SelectValue placeholder="Select a time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="09:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="13:00">1:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
              <SelectItem value="17:00">5:00 PM</SelectItem>
              <SelectItem value="18:00">6:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="location" className="text-foreground text-sm md:text-base">
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => updateFormData("location", e.target.value)}
            placeholder="Your address or preferred location in Rajkot"
            className="bg-background text-foreground"
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="message" className="text-foreground text-sm md:text-base">
            Additional Information
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => updateFormData("message", e.target.value)}
            placeholder="Any special requirements or notes"
            className="min-h-[80px] md:min-h-[100px] bg-background text-foreground"
          />
        </div>
      </div>
    </motion.div>
  )

  const renderStepContent = () => {
    switch (step) {
      case STEPS.SERVICE_SELECTION:
        return renderServiceSelection()
      case STEPS.PLAN_SELECTION:
        return renderPlanSelection()
      case STEPS.PERSONAL_INFO:
        return renderPersonalInfo()
      case STEPS.BOOKING_DETAILS:
        return renderBookingDetails()
      default:
        return null
    }
  }

  const isNextDisabled = () => {
    switch (step) {
      case STEPS.SERVICE_SELECTION:
        return !formData.service
      case STEPS.PLAN_SELECTION:
        return !formData.plan
      case STEPS.PERSONAL_INFO:
        return !formData.name || !formData.email
      case STEPS.BOOKING_DETAILS:
        return !formData.date || !formData.time || !formData.location
      default:
        return false
    }
  }

  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 md:mb-8 text-center">
            <h1 className="mb-2 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Book Your Session
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Complete the form below to schedule your fitness session.
            </p>
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex justify-between">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full text-xs md:text-sm font-medium",
                    step >= index
                      ? formData.service === "gym"
                        ? "bg-[#FF7F24] text-white"
                        : "bg-[#FF7F24] text-white"
                      : "border border-border bg-background text-muted-foreground",
                  )}
                >
                  {step > index ? <Check className="h-4 w-4" /> : index + 1}
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-4 text-center text-[10px] md:text-xs">
              <span className={step >= 0 ? "text-foreground" : "text-muted-foreground"}>Service</span>
              <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>Plan</span>
              <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>Personal Info</span>
              <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>Details</span>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-4 md:p-6 shadow-lg">
            <form onSubmit={handleSubmit}>
              {renderStepContent()}

              <div className="mt-6 md:mt-8 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="border-border text-foreground hover:bg-muted text-sm md:text-base px-3 md:px-4"
                >
                  Back
                </Button>

                {step === STEPS.BOOKING_DETAILS ? (
                  <Button
                    type="submit"
                    disabled={isNextDisabled() || loading}
                    className="bg-[#8B4513] text-white hover:bg-[#8B4513]/90 text-sm md:text-base px-3 md:px-4"
                  >
                    {loading ? "Submitting..." : "Book Now"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isNextDisabled()}
                    className="bg-[#8B4513] text-white hover:bg-[#8B4513]/90 text-sm md:text-base px-3 md:px-4"
                  >
                    Next
                  </Button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
