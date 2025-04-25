"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                backgroundColor: `rgba(255, 127, 36, ${Math.random() * 0.5 + 0.2})`,
                boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(255, 127, 36, 0.7)`,
                animation: `float ${Math.random() * 10 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Our <span className="text-amber-500">Services</span>
          </motion.h2>

          <motion.p
            className="text-lg text-gray-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We bring professional fitness training directly to you. Choose from our range of services designed to meet
            your fitness goals.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Mobile Gym Card */}
          <motion.div
            className="rounded-xl overflow-hidden relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>

            <div className="relative p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-amber-900/30 p-4 rounded-xl mr-4 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <path d="M6.5 6.5h11"></path>
                    <path d="M6.5 17.5h11"></path>
                    <path d="M6 12h12"></path>
                    <path d="M3 6.5l3.5 3.5-3.5 3.5"></path>
                    <path d="M3 17.5l3.5-3.5-3.5-3.5"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-amber-500">Mobile Gym</h3>
              </div>

              <p className="text-gray-300 mb-6 text-base">
                Our fully-equipped mobile gym brings the complete workout experience to your location. Perfect for
                individuals or small groups.
              </p>

              <div className="mb-8 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>State-of-the-art equipment</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Personal training included</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Customized workout plans</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Flexible scheduling</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services/mobile-gym"
                className="inline-flex items-center text-sm font-medium rounded-lg px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 self-start"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Most Popular
              </div>
            </div>
          </motion.div>

          {/* Yoga & Dance Card - IDENTICAL STYLING */}
          <motion.div
            className="rounded-xl overflow-hidden relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-600 opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>

            <div className="relative p-8 h-full flex flex-col">
              <div className="flex items-center mb-6">
                <div className="bg-amber-900/30 p-4 rounded-xl mr-4 backdrop-blur-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <path d="M9 18V5l12-2v13"></path>
                    <circle cx="6" cy="18" r="3"></circle>
                    <circle cx="18" cy="16" r="3"></circle>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-amber-500">Yoga & Dance</h3>
              </div>

              <p className="text-gray-300 mb-6 text-base">
                From Zumba to yoga, bring the joy of movement and mindfulness to your space with our expert instructors.
              </p>

              <div className="mb-8 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Various yoga styles</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Dance fitness classes</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Mindfulness training</span>
                  </li>
                  <li className="flex items-start text-gray-300">
                    <div className="mr-3 mt-1">
                      <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                    </div>
                    <span>Group or private sessions</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/services/yoga-dance"
                className="inline-flex items-center text-sm font-medium rounded-lg px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 self-start"
              >
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
