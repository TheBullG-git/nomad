import { NextResponse } from "next/server"
import { GoogleSpreadsheet } from "google-spreadsheet"
import { JWT } from "google-auth-library"

// Get environment variables
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || ""
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n") || ""
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID || ""

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

    // Log to Google Sheets if credentials are available
    if (GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY && GOOGLE_SHEET_ID) {
      try {
        console.log("Attempting to connect to Google Sheets...")

        // Auth with Google
        const jwt = new JWT({
          email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: GOOGLE_PRIVATE_KEY,
          scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        })

        // Initialize the sheet
        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, jwt)
        await doc.loadInfo()
        console.log("Connected to Google Sheet:", doc.title)

        // Get the first sheet
        const sheet = doc.sheetsByIndex[0]

        // Add the row
        await sheet.addRow({
          BookingID: bookingId,
          Date: bookingDate,
          Time: time,
          Name: name,
          Email: email,
          Phone: phone,
          Address: address,
          Notes: notes || "N/A",
          Status: "Pending",
        })

        console.log("Booking added to Google Sheet successfully")
      } catch (error) {
        console.error("Error logging to Google Sheets:", error)
        // Continue with the booking process even if Google Sheets fails
      }
    } else {
      console.log("Google Sheets credentials not available, logging to console instead")
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
    }

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
