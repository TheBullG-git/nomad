import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

// Create a server-side supabase client
export const createClient = () => {
  // Skip during build time
  if (process.env.NEXT_PHASE === "phase-production-build") {
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
    } as any
  }

  return createServerComponentClient<Database>({
    cookies,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  })
}
