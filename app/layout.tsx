import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NomadFitness - Mobile Gym Service",
  description: "Professional fitness training that comes to you.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <div className="flex-1 pt-16">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
