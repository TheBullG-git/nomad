import { AuthDebug } from "@/components/auth/auth-debug"

export default function AuthTestPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
      <div className="max-w-md mx-auto">
        <AuthDebug />
      </div>
    </div>
  )
}
