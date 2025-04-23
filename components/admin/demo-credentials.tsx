"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function DemoCredentials() {
  const { toast } = useToast()
  const [showPasswords, setShowPasswords] = useState(false)

  const credentials = [
    {
      role: "Admin",
      email: "admin@nomadfitness.com",
      password: "admin123",
    },
    {
      role: "Client",
      email: "client@nomadfitness.com",
      password: "client123",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The text has been copied to your clipboard.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Demo Credentials</CardTitle>
        <CardDescription>Use these credentials to test the application</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-end">
            <Button variant="outline" size="sm" onClick={() => setShowPasswords(!showPasswords)}>
              {showPasswords ? (
                <>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Passwords
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-2" />
                  Show Passwords
                </>
              )}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Role</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Password</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {credentials.map((cred) => (
                  <tr key={cred.role} className="border-b">
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          cred.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {cred.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {cred.email}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(cred.email)}
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy email</span>
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {showPasswords ? cred.password : "••••••••"}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => copyToClipboard(cred.password)}
                        >
                          <Copy className="h-3 w-3" />
                          <span className="sr-only">Copy password</span>
                        </Button>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          copyToClipboard(`Email: ${cred.email}\nPassword: ${cred.password}`)
                        }}
                      >
                        Copy All
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
