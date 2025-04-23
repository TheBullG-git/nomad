"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function EnvDebug() {
  const [envVars, setEnvVars] = useState({
    url: "",
    key: "",
  })

  useEffect(() => {
    setEnvVars({
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || "Not found",
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        ? `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 10)}...`
        : "Not found",
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Environment Debug</CardTitle>
        <CardDescription>Checking environment variables</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div>
            <span className="font-medium">NEXT_PUBLIC_SUPABASE_URL:</span> {envVars.url}
          </div>
          <div>
            <span className="font-medium">NEXT_PUBLIC_SUPABASE_ANON_KEY:</span> {envVars.key}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
