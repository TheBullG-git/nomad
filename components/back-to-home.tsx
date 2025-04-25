"use client"

import Link from "next/link"
import { Home } from "lucide-react"
import { motion } from "framer-motion"

export function BackToHome() {
  return (
    <motion.div
      className="fixed bottom-4 md:bottom-6 right-4 md:right-6 z-40"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href="/"
        className="flex items-center justify-center bg-[#8B4513] hover:bg-[#FF7F24] text-white rounded-full w-10 h-10 md:w-12 md:h-12 shadow-lg transition-all duration-300"
        aria-label="Back to Homepage"
      >
        <Home size={18} className="md:h-5 md:w-5" />
      </Link>
    </motion.div>
  )
}
