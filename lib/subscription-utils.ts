import { createClient } from "@/lib/supabase/client"

export async function getSubscriptionPreference(bookingId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("subscription_preferences")
      .select("*")
      .eq("booking_id", bookingId)
      .single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching subscription preference:", error)
    return null
  }
}

export async function saveSubscriptionPreference(
  bookingId: string,
  preferenceType: "consistent" | "flexible",
  preferredTime?: string,
) {
  const supabase = createClient()

  try {
    const { error } = await supabase.from("subscription_preferences").insert({
      booking_id: bookingId,
      preference_type: preferenceType,
      preferred_time: preferredTime || null,
    })

    if (error) throw error

    return true
  } catch (error) {
    console.error("Error saving subscription preference:", error)
    return false
  }
}
