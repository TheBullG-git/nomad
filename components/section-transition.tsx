"use client"

import { type ReactNode, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SectionTransitionProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
}

export function SectionTransition({ children, className = "", delay = 0, direction = "up" }: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Set initial and animate values based on direction
  let initial = {}
  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 50 }
      break
    case "down":
      initial = { opacity: 0, y: -50 }
      break
    case "left":
      initial = { opacity: 0, x: 50 }
      break
    case "right":
      initial = { opacity: 0, x: -50 }
      break
    case "none":
      initial = { opacity: 0 }
      break
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0 }
          : {
              opacity: 0,
              y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
              x: direction === "left" ? 50 : direction === "right" ? -50 : 0,
            }
      }
      transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
