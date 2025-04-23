"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function SetupDemoPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setupDemoUsers = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await fetch("/api/seed-users")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to set up demo users")
      }

      setSuccess(true)
    } catch (err) {
      console.error("Setup error:", err)
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">NomadFitness Demo Setup</h1>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Set Up Demo Users</CardTitle>
            <CardDescription>
              Create demo admin and client accounts for testing the NomadFitness application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-300">
                  Demo users have been set up successfully!
                </AlertDescription>
              </Alert>
            )}

            <div className="text-sm space-y-2">
              <p>This will create the following demo accounts:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Admin:</strong> admin@nomadfitness.com / admin123
                </li>
                <li>
                  <strong>Client:</strong> client@nomadfitness.com / client123
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button onClick={setupDemoUsers} className="w-full bg-purple-600 hover:bg-purple-700" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up demo users...
                </>
              ) : (
                "Set Up Demo Users"
              )}
            </Button>
            {success && (
              <Link href="/auth/sign-in" className="w-full">
                <Button variant="outline" className="w-full">
                  Go to Sign In
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
