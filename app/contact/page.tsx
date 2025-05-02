"use client"

import { useState } from "react"
import { Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type React from "react"
import { useToast } from "@/hooks/use-toast"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({
      name: "",
      email: "",
      message: "",
    })

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
    }, 5000)
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Have questions about our services? Want to book a session? Reach out to us and we'll get back to you as soon
          as possible.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Information */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Get in Touch</h2>

          <div className="mb-8 space-y-6">
            <div className="flex items-start">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                <p className="text-muted-foreground">info@nomadfitness.com</p>
                <p className="text-muted-foreground">support@nomadfitness.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">Service Area</h3>
                <p className="text-muted-foreground">
                  We serve the greater metropolitan area and surrounding suburbs within a 50-km radius.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-6">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Business Hours</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>10:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="rounded-lg border border-border bg-card p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-foreground">Send Us a Message</h2>

          {isSubmitted ? (
            <div className="rounded-lg bg-primary/10 p-6 text-center">
              <h3 className="mb-2 text-xl font-semibold text-primary">Message Sent!</h3>
              <p className="text-muted-foreground">
                Thank you for contacting us. We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-background text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="min-h-[150px] bg-background text-foreground"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-foreground">How far in advance should I book?</h3>
            <p className="text-muted-foreground">
              We recommend booking at least 24-48 hours in advance to ensure availability, especially for peak times.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-foreground">What areas do you serve?</h3>
            <p className="text-muted-foreground">
              We currently serve the greater metropolitan area and surrounding suburbs within a 50-km radius.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-foreground">Do I need to provide any equipment?</h3>
            <p className="text-muted-foreground">
              No, we bring all necessary equipment. We just need enough space to set up safely.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-foreground">How do I cancel or reschedule?</h3>
            <p className="text-muted-foreground">
              You can cancel or reschedule up to 24 hours before your session without any charge. Contact us by email.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
