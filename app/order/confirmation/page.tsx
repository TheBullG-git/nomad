"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    // Try to get order ID from URL params
    const id = searchParams.get("orderId")

    // If not in URL, try to get from sessionStorage
    if (!id) {
      const storedId = sessionStorage.getItem("lastOrderId")
      if (storedId) {
        setOrderId(storedId)
        // Clear it after retrieving
        sessionStorage.removeItem("lastOrderId")
      }
    } else {
      setOrderId(id)
    }
  }, [searchParams])

  return (
    <div className="container py-12 md:py-24">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6 flex justify-center">
          <CheckCircle2 className="h-24 w-24 text-green-500" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
            <CardDescription>
              Your mobile gym session has been successfully booked.
              {orderId && <div className="mt-2 font-medium">Order ID: {orderId}</div>}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-left">
            <p className="mb-4">We've received your order and will contact you shortly to confirm the details.</p>
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
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
