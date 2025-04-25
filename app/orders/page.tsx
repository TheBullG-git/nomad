import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Orders | Nomad Fitness",
  description: "View and manage orders",
}

// Mock data for orders since we're not using Google Sheets anymore
const mockOrders = [
  {
    id: "ORD-123456",
    date: "2023-05-15T10:30:00Z",
    customer: {
      name: "Raj Patel",
      email: "raj.patel@example.com",
    },
    service: "Mobile Gym Session",
    quantity: 1,
    totalAmount: 300,
    status: "Completed",
  },
  {
    id: "ORD-123457",
    date: "2023-05-16T14:00:00Z",
    customer: {
      name: "Priya Sharma",
      email: "priya.sharma@example.com",
    },
    service: "Monthly Plan",
    quantity: 1,
    totalAmount: 7000,
    status: "New",
  },
  {
    id: "ORD-123458",
    date: "2023-05-17T09:15:00Z",
    customer: {
      name: "Amit Singh",
      email: "amit.singh@example.com",
    },
    service: "Quarterly Plan",
    quantity: 1,
    totalAmount: 15000,
    status: "Processing",
  },
]

export default async function OrdersPage() {
  // In a real application, you would fetch orders from your database here
  const orders = mockOrders

  return (
    <div className="container py-10">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>View all orders</CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
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
                          <div>{order.customer.name}</div>
                          <div className="text-xs text-gray-500">{order.customer.email}</div>
                        </TableCell>
                        <TableCell>{order.service}</TableCell>
                        <TableCell>{order.quantity}</TableCell>
                        <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                        <TableCell>
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : order.status === "New"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
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
