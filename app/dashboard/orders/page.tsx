import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function OrdersPage() {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  // Fetch user's orders
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        *,
        services:service_id (name)
      )
    `)
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-700">Error loading orders: {error.message}</p>
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                    <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      variant={
                        order.order_status === "completed"
                          ? "default"
                          : order.order_status === "processing"
                            ? "secondary"
                            : order.order_status === "cancelled"
                              ? "destructive"
                              : "outline"
                      }
                    >
                      {order.order_status}
                    </Badge>
                    <Badge variant={order.payment_status === "paid" ? "default" : "outline"}>
                      {order.payment_status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Items</h3>
                    <ul className="space-y-2">
                      {order.order_items.map((item) => (
                        <li key={item.id} className="flex justify-between">
                          <span>
                            {item.quantity}x {item.services?.name || "Unknown Service"}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {order.notes && (
                    <div>
                      <h3 className="font-medium">Notes</h3>
                      <p className="text-muted-foreground">{order.notes}</p>
                    </div>
                  )}

                  <div className="border-t pt-2 flex justify-between items-center">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${order.total_amount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
