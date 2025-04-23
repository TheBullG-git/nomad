import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, date, time, notes, plan } = body

    // Validate required fields
    if (!name || !email || !phone || !address || !date || !time || !plan) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Generate booking ID
    const bookingId = `BKG-${Date.now().toString().slice(-6)}`

    // Format date for storage
    const bookingDate = new Date(date).toISOString().split("T")[0]

    // Get plan details
    let planName = ""
    let planPrice = 0

    switch (plan) {
      case "single-session":
        planName = "Single Session"
        planPrice = 300
        break
      case "monthly":
        planName = "Monthly Plan"
        planPrice = 7000
        break
      case "quarterly":
        planName = "Quarterly Plan"
        planPrice = 15000
        break
      case "yearly":
        planName = "Yearly Plan"
        planPrice = 25000
        break
      default:
        planName = "Unknown Plan"
        planPrice = 0
    }

    // Log booking to console
    console.log("Booking received:", {
      bookingId,
      date: bookingDate,
      time,
      name,
      email,
      phone,
      address,
      plan: planName,
      price: planPrice,
      notes: notes || "N/A",
    })

    return NextResponse.json({
      success: true,
      message: "Booking submitted successfully",
      bookingId,
    })
  } catch (error) {
    console.error("Error processing booking:", error)
    return NextResponse.json({ success: false, message: "Failed to process booking" }, { status: 500 })
  }
}
