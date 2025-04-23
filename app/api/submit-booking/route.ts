import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, address, date, time, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !address || !date || !time) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Generate booking ID
    const bookingId = `BKG-${Date.now().toString().slice(-6)}`

    // Format date for storage
    const bookingDate = new Date(date).toISOString().split("T")[0]

    // Log booking to console (since we don't have Google Sheets integration)
    console.log("Booking received:", {
      bookingId,
      date: bookingDate,
      time,
      name,
      email,
      phone,
      address,
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
