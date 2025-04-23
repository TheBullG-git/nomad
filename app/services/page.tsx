"use client"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LocationBadge } from "@/components/location-badge"

// Only the mobile gym service
const mobileGymService = {
  id: "mobile-gym",
  title: "Mobile Gym Session",
  description: "One-on-one training in our fully-equipped mobile gym truck.",
  icon: Dumbbell,
  duration: "60 min",
  features: [
    "Personalized workout plan",
    "Professional trainer guidance",
    "Full access to all equipment",
    "Fitness assessment included",
    "Flexible scheduling",
    "No travel time for you",
  ],
  image: "/focused-fitness.png",
  longDescription:
    "Experience the ultimate convenience with our signature Mobile Gym Sessions. Our fully-equipped gym truck arrives at your location, bringing a complete fitness center experience to your doorstep. Each session includes a certified personal trainer who will guide you through a customized workout tailored to your fitness goals. Whether you're looking to build strength, improve cardiovascular health, or enhance flexibility, our trainers have the expertise to help you achieve results.",
}

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10" />
        <Image
          src="/home-gym-essentials.png"
          alt="NomadFitness Services"
          width={1600}
          height={600}
          className="w-full h-[400px] object-cover"
          priority
        />
        <div className="container relative z-20 flex flex-col items-center justify-center text-center h-[400px] text-white">
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Mobile Gym Service
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Discover our premium mobile fitness service designed to fit your lifestyle and goals.
          </motion.p>
          <motion.div
            className="mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LocationBadge className="bg-white/20 text-white border border-white/30" />
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={mobileGymService.image || "/placeholder.svg"}
                  alt={mobileGymService.title}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold">{mobileGymService.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {mobileGymService.duration}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">{mobileGymService.longDescription}</p>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {mobileGymService.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/booking">Book This Service</Link>
                </Button>
                <LocationBadge variant="outline" className="sm:self-center" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our mobile gym service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>How much space do you need for the mobile gym?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our mobile gym truck requires a standard parking space (approximately 20 feet long by 8 feet wide)
                  with at least 12 feet of clearance height. We can set up in driveways, parking lots, or street parking
                  where permitted.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What if I need to reschedule my session?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We understand that plans change. You can reschedule your session with at least 24 hours notice at no
                  additional charge. Cancellations with less than 24 hours notice may incur a fee.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do I need to provide anything for my session?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Just yourself in comfortable workout clothes and a water bottle! Our mobile gym comes fully equipped
                  with everything needed for a complete workout. We provide towels, sanitizer, and all necessary fitness
                  equipment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What areas do you service?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We currently service the Rajkot, Gujarat area only. Our mobile gym trucks operate within city limits
                  and nearby areas. If you're unsure if your location is covered, please contact us directly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
              Ready to Get Started?
            </motion.h2>
            <motion.p
              className="mt-6 text-lg text-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Book your first session today and experience the convenience of fitness that comes to you in Rajkot.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-white text-purple-900 hover:bg-gray-100">
                <Link href="/booking">Book a Session</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
