"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Clock, Dumbbell, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationBadge } from "@/components/location-badge"

// Only the mobile gym service as the sole offering
const mobileGymService = {
  title: "Mobile Gym Session",
  description: "One-on-one training in our fully-equipped mobile gym truck.",
  icon: Dumbbell,
  duration: "60 min",
  href: "/services/mobile-gym",
}

const features = [
  {
    title: "Convenience",
    description: "We bring the gym to you, saving you time and eliminating travel.",
    icon: MapPin,
  },
  {
    title: "Professional Trainers",
    description: "Certified fitness experts who customize workouts to your goals.",
    icon: Users,
  },
  {
    title: "Flexible Scheduling",
    description: "Book sessions when it works for you, including evenings and weekends.",
    icon: Clock,
  },
]

export default function Home() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10" />
        <Image
          src="/mobile-fitness-unit.png"
          alt="NomadFitness Mobile Gym"
          width={1600}
          height={800}
          className="w-full h-[600px] object-cover"
          priority
        />
        <div className="container relative z-20 flex flex-col items-center justify-center text-center h-[600px] text-white">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Your Gym, <span className="text-purple-400">Anywhere</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the convenience of a fully-equipped gym that comes to you. Professional trainers, premium
            equipment, and personalized workouts — all at your doorstep.
          </motion.p>

          {/* Location Badge */}
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LocationBadge className="bg-white/20 text-white border border-white/30" />
          </motion.div>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/booking">Book a Session</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/services/mobile-gym">Learn More</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Why Choose NomadFitness?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing how people access fitness by bringing the gym experience directly to you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 rounded-lg bg-background shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Gym Service Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Our Mobile Gym Service</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the ultimate convenience with our mobile gym that comes to your location.
            </p>
            <div className="mt-2 flex justify-center">
              <LocationBadge variant="outline" />
            </div>
          </div>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="p-2 w-fit rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-2">
                    <mobileGymService.icon className="h-5 w-5" />
                  </div>
                  <CardTitle>{mobileGymService.title}</CardTitle>
                  <CardDescription>{mobileGymService.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center justify-end text-sm">
                    <div className="text-muted-foreground">{mobileGymService.duration}</div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="ghost" className="w-full justify-between group">
                    <Link href={mobileGymService.href}>
                      Learn more
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10" />
        <Image
          src="/diverse-group-workout.png"
          alt="Fitness background"
          width={1600}
          height={600}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Fitness Journey?
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Take the first step toward a healthier lifestyle with NomadFitness. Our mobile gym brings convenience and
              professional guidance right to your doorstep in Rajkot.
            </motion.p>
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-purple-900 hover:bg-gray-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <Link href="/booking" className="relative overflow-hidden group">
                  <span className="relative z-10">Book Your First Session</span>
                  {isHovered && (
                    <motion.span
                      className="absolute inset-0 bg-purple-100 z-0"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    />
                  )}
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
