import { getOrders } from "../actions/orders"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default async function OrdersPage() {
  const { success, orders = [], error } = await getOrders()

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View all orders from Google Sheets</CardDescription>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="bg-red-50 p-4 rounded-md text-red-800">
                <p>Error loading orders: {error.toString()}</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">No orders found</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">{order.id}</TableCell>
                        <TableCell>
                          <div>{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.customerEmail}</div>
                        </TableCell>
                        <TableCell>{order.serviceName}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Received"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
