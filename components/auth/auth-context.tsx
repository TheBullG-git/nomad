"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

interface AuthUser extends User {
  role?: string
}

interface AuthContextType {
  user: AuthUser | null
  setUser: (user: AuthUser | null) => void
  isLoading: boolean
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
  signOut: async () => {},
  resetPassword: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check active session and set user
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Session error:", error.message)
          return
        }

        if (data?.session?.user) {
          // Fetch user profile to get role
          const { data: profileData } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", data.session.user.id)
            .single()

          setUser({
            ...data.session.user,
            role: profileData?.role || "client",
          })
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch user profile to get role
        const { data: profileData } = await supabase.from("profiles").select("role").eq("id", session.user.id).single()

        setUser({
          ...session.user,
          role: profileData?.role || "client",
        })
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, signOut, resetPassword }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
