"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export function HeroTruck() {
  return (
    <motion.div
      className="absolute bottom-0 right-0 md:right-10 lg:right-20 w-full max-w-xs md:max-w-sm lg:max-w-md"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <Image
        src="/nomadfit-logo.jpeg"
        alt="NomadFit Mobile Gym Truck"
        width={400}
        height={300}
        className="object-contain"
      />
    </motion.div>
  )
}
