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
  return {
    success: true,
    orders: [
      {
        id: "ORD-123456",
        customerName: "Raj Patel",
        customerEmail: "raj.patel@example.com",
        customerPhone: "+91 98765 43210",
        serviceName: "Mobile Gym Session",
        quantity: 1,
        totalAmount: 300,
        createdAt: new Date().toISOString(),
        status: "Completed",
      },
      {
        id: "ORD-123457",
        customerName: "Priya Sharma",
        customerEmail: "priya.sharma@example.com",
        customerPhone: "+91 98765 43211",
        serviceName: "Monthly Plan",
        quantity: 1,
        totalAmount: 7000,
        createdAt: new Date().toISOString(),
        status: "New",
      },
    ],
  }
}

// Simple function to update order status (stub)
export async function updateOrderStatus(orderId: string, status: string) {
  console.log(`Order ${orderId} status updated to ${status}`)
  return { success: true }
}
