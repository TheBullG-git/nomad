import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Plus, Trash } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function TrucksPage() {
  const supabase = createClient()

  const { data: trucks } = await supabase.from("truck_fleet").select("*").order("created_at", { ascending: false })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Truck Fleet Management</h1>
          <p className="text-muted-foreground">Manage your mobile gym trucks and maintenance schedules.</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Truck
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Trucks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Truck Name</th>
                  <th className="text-left py-3 px-4 font-medium">License Plate</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Last Maintenance</th>
                  <th className="text-left py-3 px-4 font-medium">Next Maintenance</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trucks?.map((truck) => (
                  <tr key={truck.id} className="border-b">
                    <td className="py-3 px-4 font-medium">{truck.truck_name}</td>
                    <td className="py-3 px-4">{truck.license_plate}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          truck.status === "active"
                            ? "default"
                            : truck.status === "maintenance"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {truck.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      {truck.last_maintenance_date ? new Date(truck.last_maintenance_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      {truck.next_maintenance_date ? new Date(truck.next_maintenance_date).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!trucks || trucks.length === 0) && (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-muted-foreground">
                      No trucks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
