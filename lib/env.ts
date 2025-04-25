// Helper to safely access environment variables
export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY,

  // Add environment variables as needed
}

// Validate required environment variables
export function validateEnv() {
  const requiredEnvVars: { key: string; value: string | undefined }[] = [
    { key: "SUPABASE_URL", value: env.SUPABASE_URL },
    { key: "SUPABASE_ANON_KEY", value: env.SUPABASE_ANON_KEY },
    // Add required environment variables here
  ]

  const missingEnvVars = requiredEnvVars.filter(({ value }) => !value)

  if (missingEnvVars.length > 0) {
    const missingKeys = missingEnvVars.map(({ key }) => key).join(", ")
    console.error(`Missing required environment variables: ${missingKeys}`)
    return false
  }

  return true
}
