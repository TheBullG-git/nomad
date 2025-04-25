"use client"
import Link from "next/link"
import { ArrowRight, Dumbbell, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedBackground } from "@/components/animated-background"
import { motion } from "framer-motion"

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen pt-16">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <motion.div
          className="mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Our Services</h1>
          <p className="mx-auto max-w-2xl text-sm md:text-base lg:text-lg text-muted-foreground">
            We bring professional fitness training directly to you. Choose from our range of services designed to meet
            your fitness goals.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Mobile Gym Service */}
          <motion.div
            className="overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur-sm shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center mb-4">
                <div className="bg-primary/10 p-3 md:p-4 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <Dumbbell className="h-5 w-5 md:h-8 md:w-8 text-primary" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-primary">Mobile Gym</h2>
              </div>
              <p className="mb-4 text-muted-foreground text-sm md:text-base">
                Our fully-equipped mobile gym brings the complete workout experience to your location. Perfect for
                individuals or small groups who want the gym experience without leaving home.
              </p>
              <ul className="mb-6 space-y-2 text-muted-foreground text-sm md:text-base">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <span>State-of-the-art equipment</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <span>Personal training included</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <span>Customized workout plans</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></div>
                  <span>Flexible scheduling</span>
                </li>
              </ul>
              <Link href="/services/mobile-gym" passHref>
                <Button
                  variant="outline"
                  className="group border-primary text-primary hover:bg-primary hover:text-primary-foreground w-full sm:w-auto"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Yoga and Dance Service */}
          <motion.div
            className="overflow-hidden rounded-lg border border-border bg-card/80 backdrop-blur-sm shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="p-5 md:p-6">
              <div className="flex items-center mb-4">
                <div className="bg-accent/10 p-3 md:p-4 rounded-full mr-3 md:mr-4 flex-shrink-0">
                  <Music className="h-5 w-5 md:h-8 md:w-8 text-accent" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-accent">Yoga and Dance</h2>
              </div>
              <p className="mb-4 text-muted-foreground text-sm md:text-base">
                Experience the benefits of movement-based fitness with our professional yoga and dance instructors.
                Classes can be held at your home, office, or preferred location.
              </p>
              <ul className="mb-6 space-y-2 text-muted-foreground text-sm md:text-base">
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></div>
                  <span>Various yoga styles</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></div>
                  <span>Dance fitness classes</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></div>
                  <span>Mindfulness training</span>
                </li>
                <li className="flex items-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-accent mr-2"></div>
                  <span>Group or private sessions</span>
                </li>
              </ul>
              <Link href="/services/yoga-dance" passHref>
                <Button
                  variant="outline"
                  className="group border-accent text-accent hover:bg-accent hover:text-accent-foreground w-full sm:w-auto"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
