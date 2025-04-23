"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, XCircle } from "lucide-react"

export default function TestConnectionPage() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [envVars, setEnvVars] = useState<{
    url: string | null
    key: string | null
  }>({
    url: null,
    key: null,
  })

  useEffect(() => {
    async function testConnection() {
      try {
        // Get environment variables (only public ones will be available)
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        setEnvVars({
          url: url || null,
          key: key ? `${key.substring(0, 10)}...` : null, // Only show part of the key for security
        })

        // Test the connection
        const supabase = createClient()
        const { data, error } = await supabase.from("services").select("count").limit(1)

        if (error) {
          throw error
        }

        setIsConnected(true)
      } catch (err: any) {
        console.error("Connection test failed:", err)
        setIsConnected(false)
        setError(err.message || "Unknown error occurred")
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Supabase Connection Test</h1>

      <div className="grid gap-6 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
            <CardDescription>Checking if environment variables are accessible</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span>{" "}
                {envVars.url ? (
                  <span className="text-green-600 dark:text-green-400">{envVars.url}</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">Not found</span>
                )}
              </div>
              <div>
                <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span>{" "}
                {envVars.key ? (
                  <span className="text-green-600 dark:text-green-400">{envVars.key}</span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">Not found</span>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>Testing connection to Supabase</CardDescription>
          </CardHeader>
          <CardContent>
            {isConnected === null ? (
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-blue-600 animate-spin mr-2"></div>
                <span>Testing connection...</span>
              </div>
            ) : isConnected ? (
              <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Successfully connected to Supabase!</AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Connection Failed</AlertTitle>
                <AlertDescription>{error || "Could not connect to Supabase"}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
