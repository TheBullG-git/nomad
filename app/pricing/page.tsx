"use client"
import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { AnimatedBackground } from "@/components/animated-background"

export default function PricingPage() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div
          className="mb-8 md:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-3 md:mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            Simple, Transparent Pricing
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground">
            Choose the perfect plan for your fitness journey. All plans include access to our state-of-the-art mobile
            gym equipment.
          </p>
        </motion.div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2 max-w-5xl mx-auto">
          {/* Yoga and Dance Plans */}
          <motion.div
            className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-accent/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-accent mb-2">Yoga and Dance</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Perfect for those looking for flexibility and movement-based fitness
              </p>
            </div>

            <div className="mb-6 md:mb-8 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">1 hour session</span>
                <span className="text-lg md:text-xl font-bold text-accent">₹200</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">1 month</span>
                <span className="text-lg md:text-xl font-bold text-accent">₹4,000</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">3 months</span>
                <span className="text-lg md:text-xl font-bold text-accent">₹8,000</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">6 months</span>
                <span className="text-lg md:text-xl font-bold text-accent">₹12,000</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">1 year</span>
                <span className="text-lg md:text-xl font-bold text-accent">₹18,000</span>
              </div>
            </div>

            <ul className="mb-6 md:mb-8 space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Professional yoga instructors</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Various dance styles available</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Flexibility training</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-accent mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Mindfulness practices</span>
              </li>
            </ul>

            <Link href="/booking?service=yoga" passHref>
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Book Now</Button>
            </Link>
          </motion.div>

          {/* Gym Plans */}
          <motion.div
            className="rounded-lg border border-border bg-card/80 backdrop-blur-sm p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">Mobile Gym</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Full access to our mobile gym equipment and personal training
              </p>
            </div>

            <div className="mb-6 md:mb-8 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">1 hour session</span>
                <span className="text-lg md:text-xl font-bold text-primary">₹300</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">1 month</span>
                <span className="text-lg md:text-xl font-bold text-primary">₹7,000</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">3 months</span>
                <span className="text-lg md:text-xl font-bold text-primary">₹12,000</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">6 months</span>
                <span className="text-lg md:text-xl font-bold text-primary">₹20,000</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span className="font-medium text-foreground text-sm md:text-base">1 year</span>
                <span className="text-lg md:text-xl font-bold text-primary">₹25,000</span>
              </div>
            </div>

            <ul className="mb-6 md:mb-8 space-y-3">
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Full access to mobile gym equipment</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Personal training sessions</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Customized workout plans</span>
              </li>
              <li className="flex items-start">
                <Check className="mr-2 h-4 w-4 md:h-5 md:w-5 shrink-0 text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm md:text-base">Nutrition guidance</span>
              </li>
            </ul>

            <Link href="/booking?service=gym" passHref>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Book Now</Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="mt-8 md:mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-base md:text-lg text-muted-foreground mb-4 md:mb-6">
            Not sure which plan is right for you? Contact us for a free consultation.
          </p>
          <Link href="/contact" passHref>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact Us
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
