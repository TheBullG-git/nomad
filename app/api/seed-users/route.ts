import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createClient()

    // Create admin user
    const { data: adminData, error: adminError } = await supabase.auth.admin.createUser({
      email: "admin@nomadfitness.com",
      password: "admin123",
      email_confirm: true,
    })

    if (adminError && adminError.message !== "User already registered") {
      console.error("Admin user creation error:", adminError)
    } else {
      console.log("Admin user created or already exists")

      // Create admin profile if user was created
      if (adminData?.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: adminData.user.id,
          role: "admin",
          first_name: "Admin",
          last_name: "User",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (profileError && profileError.code !== "23505") {
          // 23505 is the error code for unique constraint violation (profile already exists)
          console.error("Admin profile creation error:", profileError)
        }
      }
    }

    // Create client user
    const { data: clientData, error: clientError } = await supabase.auth.admin.createUser({
      email: "client@nomadfitness.com",
      password: "client123",
      email_confirm: true,
    })

    if (clientError && clientError.message !== "User already registered") {
      console.error("Client user creation error:", clientError)
    } else {
      console.log("Client user created or already exists")

      // Create client profile if user was created
      if (clientData?.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: clientData.user.id,
          role: "client",
          first_name: "Client",
          last_name: "User",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (profileError && profileError.code !== "23505") {
          console.error("Client profile creation error:", profileError)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Demo users created or already exist",
    })
  } catch (error) {
    console.error("Error creating demo users:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create demo users",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
