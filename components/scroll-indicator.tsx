"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface Section {
  id: string
  label: string
}

interface ScrollIndicatorProps {
  sections: Section[]
}

export function ScrollIndicator({ sections }: ScrollIndicatorProps) {
  const [activeSection, setActiveSection] = useState(sections[0].id)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          })
        },
        { threshold: 0.5 },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    window.scrollTo({
      top: element.offsetTop - 100,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center space-y-4 md:flex"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className="group flex items-center"
          aria-label={`Scroll to ${label}`}
        >
          <span
            className={`mr-2 max-w-0 overflow-hidden whitespace-nowrap text-sm transition-all duration-300 group-hover:max-w-xs ${
              activeSection === id ? "text-primary" : "text-foreground/50"
            }`}
          >
            {label}
          </span>
          <div
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              activeSection === id ? "scale-125 bg-primary" : "bg-foreground/30 group-hover:bg-foreground/50"
            }`}
          />
        </button>
      ))}
    </motion.div>
  )
}
