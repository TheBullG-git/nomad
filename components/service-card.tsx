"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServiceCardProps {
  title: string
  description: string
  image: string
  features: string[]
  link: string
  isPopular?: boolean
  accentColor?: "primary" | "secondary" | "foreground"
}

export function ServiceCard({
  title,
  description,
  image,
  features,
  link,
  isPopular = false,
  accentColor = "primary",
}: ServiceCardProps) {
  return (
    <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all duration-300 hover:border-foreground/20 hover:shadow-lg dark:hover:shadow-foreground/5">
      <div className="relative h-48 overflow-hidden">
        <div className="image-hover h-full w-full">
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {isPopular && (
          <div className="absolute bottom-4 left-4 rounded-full bg-primary/90 px-3 py-1 text-xs font-medium text-white">
            Most Popular
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <motion.h3
          className={`mb-2 text-xl font-bold text-${accentColor}`}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h3>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <ul className="mb-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <div className={`mr-2 h-1.5 w-1.5 rounded-full bg-${accentColor}`} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Link
          href={link}
          className={`inline-flex items-center text-sm font-medium text-${accentColor} transition-all hover:underline`}
        >
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  )
}
