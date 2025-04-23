"use client"

import type React from "react"
import { createContext, useContext } from "react"

// Create a context with default values
const AuthContext = createContext({
  user: null,
  signOut: async () => {},
})

// Export the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={{ user: null, signOut: async () => {} }}>{children}</AuthContext.Provider>
}

// Export the useAuth hook
export function useAuth() {
  return useContext(AuthContext)
}
