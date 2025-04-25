"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-12 md:py-20 hero-gradient text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Fitness Experience?
          </motion.h2>

          <motion.p
            className="text-base md:text-lg mb-6 md:mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Book your first session today and experience the convenience of fitness that comes to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/booking"
              className="bg-white text-primary hover:bg-white/90 px-6 py-3 sm:px-8 sm:py-3 rounded-md font-medium text-base sm:text-lg inline-block transition-all"
            >
              Book Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
