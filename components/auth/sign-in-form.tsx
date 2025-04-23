"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/components/auth/auth-context"
import { supabase } from "@/lib/supabase/client"

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
})

type SignInFormValues = z.infer<typeof signInSchema>

export function SignInForm() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignInFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Use signInWithPassword instead of signIn
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (signInError) throw signInError

      // If sign-in succeeds, fetch user profile to get role
      if (signInData?.user) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", signInData.user.id)
          .single()

        // Set user in context with role
        setUser({
          ...signInData.user,
          role: profileData?.role || "client",
        })

        // Redirect based on role
        if (profileData?.role === "admin") {
          router.push("/admin")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err: any) {
      console.error("Sign in error:", err)
      setError(err.message || "An error occurred during sign in. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" {...register("email")} disabled={isLoading} />
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" placeholder="••••••••" {...register("password")} disabled={isLoading} />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <Link href="/auth/forgot-password" className="text-sm text-purple-600 hover:text-purple-800 font-medium">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/sign-up" className="text-purple-600 hover:text-purple-800 font-medium">
          Sign up
        </Link>
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        <p>
          Demo credentials:
          <br />
          Admin: admin@nomadfitness.com / admin123
          <br />
          Client: client@nomadfitness.com / client123
        </p>
      </div>
    </div>
  )
}
