"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  delay?: number
  accentColor?: string
}

export function FeatureCard({ icon, title, description, delay = 0, accentColor = "primary" }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="group h-full overflow-hidden border-border/50 transition-all duration-300 hover:border-foreground/20 hover:shadow-lg dark:hover:shadow-foreground/5">
        <CardContent className="flex h-full flex-col p-6">
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-${accentColor}/10 text-${accentColor} transition-transform duration-300 group-hover:scale-110`}
          >
            {icon}
          </div>
          <h3 className="mb-2 text-xl font-bold">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
