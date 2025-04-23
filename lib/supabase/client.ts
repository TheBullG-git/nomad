import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Use environment variables for the Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton instance of the Supabase client
let supabaseInstance: ReturnType<typeof createClient<Database>> | null = null

export function createClientInstance() {
  // Only create a client if we're in the browser or if the URL and key are available
  if (typeof window !== "undefined" || (supabaseUrl && supabaseAnonKey)) {
    if (!supabaseInstance) {
      supabaseInstance = createClient<Database>(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
        },
      })
    }
    return supabaseInstance
  }

  // Return a mock client during build time
  return {
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          limit: () => Promise.resolve({ data: [], error: null }),
          order: () => Promise.resolve({ data: [], error: null }),
        }),
      }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  } as unknown as ReturnType<typeof createClient<Database>>
}

// Export both the singleton instance and the createClient function
export const supabase = createClientInstance()
export { createClientInstance as createClient }
