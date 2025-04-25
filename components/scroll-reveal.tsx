"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface ScrollRevealProps {
  children: ReactNode
  width?: "fit-content" | "100%"
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  className?: string
}

export function ScrollReveal({
  children,
  width = "fit-content",
  delay = 0,
  duration = 0.5,
  direction = "up",
  className = "",
}: ScrollRevealProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  // Set initial and animate values based on direction
  let initial = {}

  switch (direction) {
    case "up":
      initial = { opacity: 0, y: 30 }
      break
    case "down":
      initial = { opacity: 0, y: -30 }
      break
    case "left":
      initial = { opacity: 0, x: 30 }
      break
    case "right":
      initial = { opacity: 0, x: -30 }
      break
    case "none":
      initial = { opacity: 0 }
      break
  }

  const variants = {
    hidden: initial,
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      style={{ width }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
