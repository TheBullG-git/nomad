import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, service, date, time, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !service) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Generate order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`

    // Log order to console
    console.log("Order received:", {
      orderId,
      date: date || "N/A",
      time: time || "N/A",
      name,
      email,
      phone,
      address: address || "N/A",
      service,
      notes: notes || "N/A",
    })

    // In a production environment, you would typically:
    // 1. Store this data in a database
    // 2. Send confirmation emails
    // 3. Integrate with a CRM or order management system

    return NextResponse.json({
      success: true,
      message: "Order submitted successfully",
      orderId,
    })
  } catch (error) {
    console.error("Error processing order:", error)
    return NextResponse.json({ success: false, message: "Failed to process order" }, { status: 500 })
  }
}
