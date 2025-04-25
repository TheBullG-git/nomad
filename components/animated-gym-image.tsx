"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AnimatedGymImageProps {
  className?: string
}

export function AnimatedGymImage({ className = "" }: AnimatedGymImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      {/* Animated overlay elements */}
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-r from-primary/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />

      {/* Animated highlight points */}
      {isLoaded && (
        <>
          {/* Highlight the gym equipment */}
          <motion.div
            className="absolute top-[30%] left-[30%] z-20 h-16 w-16 rounded-full border-2 border-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Highlight the person working out */}
          <motion.div
            className="absolute top-[40%] right-[30%] z-20 h-16 w-16 rounded-full border-2 border-secondary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-secondary/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Highlight the mobile aspect */}
          <motion.div
            className="absolute bottom-[20%] left-[20%] z-20 h-16 w-16 rounded-full border-2 border-accent"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-accent/20"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </>
      )}

      {/* Main image */}
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0 }}
        animate={{ filter: "blur(0px)", opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="/mobile-gym-trailer.png"
          alt="Nomad Fit Mobile Gym"
          width={800}
          height={500}
          className="w-full object-cover"
          priority
        />
      </motion.div>

      {/* Animated labels */}
      {isLoaded && (
        <>
          <motion.div
            className="absolute top-[25%] left-[25%] z-30 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            Complete Equipment
          </motion.div>

          <motion.div
            className="absolute top-[35%] right-[25%] z-30 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            Professional Training
          </motion.div>

          <motion.div
            className="absolute bottom-[15%] left-[15%] z-30 rounded-md bg-background/80 px-2 py-1 text-xs backdrop-blur-sm md:text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            Mobile Convenience
          </motion.div>
        </>
      )}
    </div>
  )
}
