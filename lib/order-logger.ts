// Simple order logger (replacement for Google Sheets integration)
export interface OrderData {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  serviceName: string
  quantity: number
  totalAmount: number
  notes?: string
  createdAt: string
}

// Log order to console (simulating external integration)
export async function logOrder(order: OrderData): Promise<{ success: boolean }> {
  try {
    console.log("ORDER RECEIVED:", {
      id: order.id,
      customer: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      service: order.serviceName,
      quantity: order.quantity,
      amount: order.totalAmount,
      date: order.createdAt,
      notes: order.notes || "None",
    })

    return { success: true }
  } catch (error) {
    console.error("Error logging order:", error)
    return { success: false }
  }
}

// Simple function to get orders (stub)
export async function getOrders() {
  return { success: true, orders: [] }
}

// Simple function to update order status (stub)
export async function updateOrderStatus(orderId: string, status: string) {
  console.log(`Order ${orderId} status updated to ${status}`)
  return { success: true }
}
