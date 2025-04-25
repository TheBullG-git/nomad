"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#8B4513]/95 backdrop-blur-sm shadow-md" : "bg-[#8B4513]/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white">NomadFit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="nav-link">
              Home
            </Link>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <Link href="/services" className="nav-link">
              Services
            </Link>
            <Link href="/truck-tour" className="nav-link">
              Truck Tour
            </Link>
            <Link href="/pricing" className="nav-link">
              Pricing
            </Link>
            <Link href="/contact" className="nav-link">
              Contact
            </Link>
          </nav>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Link
              href="/booking"
              className="hidden md:block bg-white text-[#FF7F24] hover:bg-white/90 font-medium px-6 py-2 rounded-md transition-all"
            >
              Book Now
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu with animation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 bg-[#8B4513]/95 backdrop-blur-md rounded-b-lg shadow-lg"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <nav className="flex flex-col space-y-4">
                <Link href="/" className="nav-link px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="nav-link px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link>
                <Link href="/services" className="nav-link px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  Services
                </Link>
                <Link href="/truck-tour" className="nav-link px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  Truck Tour
                </Link>
                <Link href="/pricing" className="nav-link px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  Pricing
                </Link>
                <Link href="/contact" className="nav-link px-4 py-2" onClick={() => setIsMenuOpen(false)}>
                  Contact
                </Link>
                <div className="px-4 pt-2">
                  <Link
                    href="/booking"
                    className="bg-white text-[#FF7F24] hover:bg-white/90 font-medium px-6 py-2 rounded-md transition-all inline-block w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Book Now
                  </Link>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
