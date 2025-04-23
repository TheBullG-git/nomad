"use client"

import { useState } from "react"
import { createOrder } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import type { Database } from "@/lib/supabase/database.types"

type Service = Database["public"]["Tables"]["services"]["Row"]

interface OrderFormProps {
  services: Service[]
}

export function OrderForm({ services }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedService, setSelectedService] = useState<string>(services[0]?.id || "")
  const [quantity, setQuantity] = useState(1)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)

    try {
      const result = await createOrder(formData)

      if (result.success) {
        toast({
          title: "Order created",
          description: "Your order has been successfully created.",
        })
        setQuantity(1)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to create order",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedServiceDetails = services.find((service) => service.id === selectedService)
  const totalPrice = selectedServiceDetails ? (selectedServiceDetails.price || 0) * quantity : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Order</CardTitle>
        <CardDescription>Place a new order for a service</CardDescription>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="serviceId">Select Service</Label>
            <select
              id="serviceId"
              name="serviceId"
              className="w-full p-2 border rounded-md"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name} - ${service.price?.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Any special instructions or notes" />
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between">
              <span className="font-semibold">Total Price:</span>
              <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Payment will be collected in cash upon delivery</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
