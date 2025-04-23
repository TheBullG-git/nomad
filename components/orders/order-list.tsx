"use client"

import { useState } from "react"
import { updateOrderStatus } from "@/app/actions/orders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"

interface OrderItem {
  id: string
  order_id: string
  service_id: string
  quantity: number
  price: number
  service: {
    id: string
    name: string
    description: string
    price: number | null
  }
}

interface Order {
  id: string
  user_id: string
  total_amount: number
  payment_method: string
  payment_status: string
  order_status: string
  notes: string | null
  created_at: string
  updated_at: string
  order_items: OrderItem[]
  user: {
    id: string
    first_name: string | null
    last_name: string | null
    email?: string
  }
}

interface OrderListProps {
  orders: Order[]
  isAdmin?: boolean
}

export function OrderList({ orders, isAdmin = false }: OrderListProps) {
  const [processingOrders, setProcessingOrders] = useState<Set<string>>(new Set())

  const handleStatusUpdate = async (orderId: string, status: string) => {
    setProcessingOrders((prev) => new Set(prev).add(orderId))

    try {
      const result = await updateOrderStatus(orderId, status)

      if (result.success) {
        toast({
          title: "Status updated",
          description: `Order status has been updated to ${status}`,
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to update order status",
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
      setProcessingOrders((prev) => {
        const newSet = new Set(prev)
        newSet.delete(orderId)
        return newSet
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "received":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "refunded":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-center text-gray-500">No orders found</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                <CardDescription>{formatDate(order.created_at)}</CardDescription>
              </div>
              <div className="flex gap-2">
                <Badge className={getStatusColor(order.order_status)}>{order.order_status}</Badge>
                <Badge className={getPaymentStatusColor(order.payment_status)}>{order.payment_status}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isAdmin && (
                <div className="border-b pb-2">
                  <p className="font-medium">Customer</p>
                  <p>
                    {order.user.first_name} {order.user.last_name}
                    {order.user.email && ` (${order.user.email})`}
                  </p>
                </div>
              )}

              <div>
                <p className="font-medium mb-2">Items</p>
                <ul className="space-y-2">
                  {order.order_items.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>
                        {item.quantity}x {item.service.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {order.notes && (
                <div>
                  <p className="font-medium">Notes</p>
                  <p className="text-gray-700">{order.notes}</p>
                </div>
              )}

              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="font-bold">${order.total_amount.toFixed(2)}</span>
              </div>

              {isAdmin && order.order_status !== "completed" && order.order_status !== "cancelled" && (
                <div className="border-t pt-4 flex gap-2 justify-end">
                  {order.order_status === "received" && (
                    <Button
                      variant="outline"
                      onClick={() => handleStatusUpdate(order.id, "processing")}
                      disabled={processingOrders.has(order.id)}
                    >
                      {processingOrders.has(order.id) ? "Updating..." : "Mark as Processing"}
                    </Button>
                  )}

                  {(order.order_status === "received" || order.order_status === "processing") && (
                    <>
                      <Button
                        variant="default"
                        onClick={() => handleStatusUpdate(order.id, "completed")}
                        disabled={processingOrders.has(order.id)}
                      >
                        {processingOrders.has(order.id) ? "Updating..." : "Mark as Completed"}
                      </Button>

                      <Button
                        variant="destructive"
                        onClick={() => handleStatusUpdate(order.id, "cancelled")}
                        disabled={processingOrders.has(order.id)}
                      >
                        {processingOrders.has(order.id) ? "Updating..." : "Cancel Order"}
                      </Button>
                    </>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
