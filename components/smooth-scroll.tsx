"use client"

import { useRef, type ReactNode } from "react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

interface SmoothScrollProps {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Create a progress bar at the top of the page
  const scaleX = useTransform(smoothProgress, [0, 1], ["0%", "100%"])

  return (
    <div ref={ref} className="relative">
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-primary to-secondary"
        style={{ scaleX }}
      />
      {children}
    </div>
  )
}
