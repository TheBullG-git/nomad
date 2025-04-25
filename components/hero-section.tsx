"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import { AnimatedBackground } from "./animated-background"

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#8B4513] to-[#FF7F24] opacity-90 z-0"></div>

      {/* Animated background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 z-10 text-center relative">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/nomadfit-logo-new.png"
            alt="NomadFit Logo"
            width={400}
            height={200}
            className="mx-auto w-full max-w-[300px] md:max-w-[400px] drop-shadow-2xl"
            priority
          />
        </motion.div>

        <motion.h2
          className="text-2xl md:text-3xl text-white max-w-2xl mx-auto mb-4 font-bold drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Fitness on the Move
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8 drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Your gym anytime in Rajkot
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/booking"
            className="bg-white text-[#FF7F24] hover:bg-white/90 px-8 py-4 rounded-full font-medium text-lg inline-block transition-all shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Book Now
          </Link>
        </motion.div>

        {/* Animated decorative elements */}
        <motion.div
          className="absolute -left-10 top-1/4 w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -right-10 bottom-1/4 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"
          animate={{
            y: [0, -20, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollY > 100 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ChevronDown size={32} className="drop-shadow-lg" />
        </motion.div>
      </motion.div>
    </section>
  )
}
