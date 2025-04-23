import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { OrderForm } from "@/components/orders/order-form"

export default async function NewOrderPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  const { data: services } = await supabase.from("services").select("*").eq("is_active", true).order("name")

  return (
    <DashboardShell>
      <DashboardHeader heading="New Order" text="Place a new order for services" profile={profile} />

      <div className="grid gap-8">
        <OrderForm services={services || []} />
      </div>
    </DashboardShell>
  )
}
