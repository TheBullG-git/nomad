"use server"

import { createClient } from "@/lib/supabase/server"
import { logOrder, getOrders as fetchOrders, updateOrderStatus as updateStatus } from "@/lib/order-logger"
import { revalidatePath } from "next/cache"

// Type for order creation
interface CreateOrderParams {
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  quantity: number
  totalAmount: number
  notes?: string
}

// Function to create an order
export async function createOrder(params: CreateOrderParams) {
  const supabase = createClient()

  try {
    // Create the order in database
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        total_amount: params.totalAmount,
        payment_method: "cash",
        payment_status: "pending",
        order_status: "received",
        notes: params.notes || "",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      throw new Error("Failed to create order")
    }

    // Log the order (instead of Google Sheets)
    await logOrder({
      id: orderData.id,
      customerName: params.customerName,
      customerEmail: params.customerEmail,
      customerPhone: params.customerPhone,
      serviceName: params.serviceName,
      quantity: params.quantity,
      totalAmount: params.totalAmount,
      notes: params.notes,
      createdAt: new Date().toISOString(),
    })

    revalidatePath("/order")
    return { success: true, orderId: orderData.id }
  } catch (error) {
    console.error("Order creation error:", error)
    throw error
  }
}

// Get orders
export async function getOrders() {
  return await fetchOrders()
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
  return await updateStatus(orderId, status)
}
