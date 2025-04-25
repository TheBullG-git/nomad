import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BackToHome } from "@/components/back-to-home"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NomadFitness - Your Gym, Anywhere",
  description: "Mobile fitness solutions that come to your location",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <BackToHome />
        </ThemeProvider>
      </body>
    </html>
  )
}
