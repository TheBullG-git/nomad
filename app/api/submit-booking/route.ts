import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    const { service, plan, name, email, phone, date, time, location } = body

    if (!service || !plan || !name || !email || !phone || !date || !time || !location) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Generate a booking ID
    const bookingId = `BK-${Date.now().toString().slice(-6)}`

    // In a production environment, you would save this data to your database
    // For now, we'll just log it and return a success response
    console.log("Booking received:", {
      bookingId,
      service,
      plan,
      name,
      email,
      phone,
      date,
      time,
      location,
      message: body.message || "",
    })

    // Return success response with booking ID
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
