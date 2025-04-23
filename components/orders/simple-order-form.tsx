"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createOrder } from "@/app/actions/orders"

export function SimpleOrderForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [service, setService] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const services = [
    { id: "mobile-gym", name: "Mobile Gym Session", price: 100 },
    { id: "personal-training", name: "Personal Training", price: 75 },
    { id: "group-fitness", name: "Group Fitness Class", price: 50 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      // Validate form
      if (!name || !email || !phone || !service) {
        setMessage("Please fill in all required fields")
        setIsSuccess(false)
        setIsSubmitting(false)
        return
      }

      // Find selected service
      const selectedService = services.find((s) => s.id === service)
      if (!selectedService) {
        setMessage("Please select a valid service")
        setIsSuccess(false)
        setIsSubmitting(false)
        return
      }

      // Calculate total
      const totalAmount = selectedService.price * quantity

      // Submit order
      const result = await createOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        serviceName: selectedService.name,
        quantity,
        totalAmount,
        notes,
      })

      if (result.success) {
        setMessage("Your order has been submitted successfully!")
        setIsSuccess(true)
        // Reset form
        setName("")
        setEmail("")
        setPhone("")
        setService("")
        setQuantity(1)
        setNotes("")
      } else {
        setMessage("Failed to submit your order. Please try again.")
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.")
      setIsSuccess(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Place Your Order</h2>

      {message && (
        <div className={`p-4 mb-4 rounded-md ${isSuccess ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={isSubmitting} required />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={isSubmitting} required />
        </div>

        <div>
          <Label htmlFor="service">Service</Label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={isSubmitting}
            required
          >
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} - Rs.{s.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            disabled={isSubmitting}
            required
          />
        </div>

        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} disabled={isSubmitting} />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Place Order"}
        </Button>
      </form>
    </div>
  )
}
