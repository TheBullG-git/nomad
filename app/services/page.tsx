"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationBadge } from "@/components/location-badge"

const features = [
  "Personalized workout plan",
  "Professional trainer guidance",
  "Full access to all equipment",
  "Fitness assessment included",
  "Flexible scheduling",
  "No travel time for you",
]

const equipmentList = [
  {
    category: "Strength Training",
    items: [
      "Adjustable dumbbells (5-50 lbs)",
      "Olympic barbell and weight plates",
      "Kettlebells (various weights)",
      "Resistance bands",
      "TRX suspension system",
      "Medicine balls",
    ],
  },
  {
    category: "Cardio",
    items: [
      "Foldable treadmill",
      "Stationary bike",
      "Rowing machine",
      "Jump ropes",
      "Step platforms",
      "Agility ladders",
    ],
  },
  {
    category: "Recovery",
    items: [
      "Foam rollers",
      "Massage tools",
      "Yoga mats",
      "Stretching equipment",
      "Compression therapy devices",
      "Ice/heat packs",
    ],
  },
]

const faqs = [
  {
    question: "How much space do you need for the mobile gym?",
    answer:
      "Our mobile gym truck requires a standard parking space (approximately 20 feet long by 8 feet wide) with at least 12 feet of clearance height. We can set up in driveways, parking lots, or street parking where permitted.",
  },
  {
    question: "What if I need to reschedule my session?",
    answer:
      "We understand that plans change. You can reschedule your session with at least 24 hours notice at no additional charge. Cancellations with less than 24 hours notice may incur a fee.",
  },
  {
    question: "Do I need to provide anything for my session?",
    answer:
      "Just yourself in comfortable workout clothes and a water bottle! Our mobile gym comes fully equipped with everything needed for a complete workout. We provide towels, sanitizer, and all necessary fitness equipment.",
  },
  {
    question: "What areas do you service?",
    answer:
      "We currently service the Rajkot, Gujarat area only. Our mobile gym trucks operate within city limits and nearby areas. If you're unsure if your location is covered, please contact us directly.",
  },
  {
    question: "How long is a typical session?",
    answer:
      "Our standard mobile gym session is 60 minutes. This includes setup time, your workout, and brief cool-down. We can accommodate longer sessions upon request.",
  },
]

export default function MobileGymServicePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10" />
        <Image
          src="/mobile-fitness-unit.png"
          alt="NomadFitness Mobile Gym"
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
            Mobile Gym Session
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Experience the ultimate convenience with our fully-equipped mobile gym that comes to your location.
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

      {/* Breadcrumb */}
      <div className="container mt-4">
        <Link href="/services" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </div>

      {/* Service Details */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="rounded-lg overflow-hidden">
                <Image
                  src="/focused-fitness.png"
                  alt="Mobile Gym Session"
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
                <h2 className="text-3xl font-bold">Mobile Gym Session</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    60 min
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">
                Experience the ultimate convenience with our signature Mobile Gym Sessions. Our fully-equipped gym truck
                arrives at your location, bringing a complete fitness center experience to your doorstep. Each session
                includes a certified personal trainer who will guide you through a customized workout tailored to your
                fitness goals. Whether you're looking to build strength, improve cardiovascular health, or enhance
                flexibility, our trainers have the expertise to help you achieve results.
              </p>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {features.map((feature, index) => (
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

      {/* Equipment Section */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Mobile Gym Equipment</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mobile gym trucks are fully equipped with premium fitness equipment to provide a comprehensive workout
              experience.
            </p>
          </div>

          <Tabs defaultValue="strength" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="strength">Strength Training</TabsTrigger>
              <TabsTrigger value="cardio">Cardio</TabsTrigger>
              <TabsTrigger value="recovery">Recovery</TabsTrigger>
            </TabsList>
            {equipmentList.map((category) => (
              <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase().split(" ")[0]}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">{category.category} Equipment</h3>
                    <ul className="space-y-2">
                      {category.items.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-center"
                        >
                          <Check className="mr-2 h-4 w-4 text-purple-600" />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={
                        category.category === "Strength Training"
                          ? "/modern-gym-floor.png"
                          : category.category === "Cardio"
                            ? "/modern-gym-cardio.png"
                            : "/placeholder.svg?height=300&width=500&query=gym recovery equipment"
                      }
                      alt={`${category.category} Equipment`}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Booking a mobile gym session is simple and convenient. Here's what to expect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Book Your Session",
                description:
                  "Choose a date, time, and location that works for you through our easy online booking system.",
              },
              {
                step: "2",
                title: "We Come to You",
                description:
                  "Our fully-equipped mobile gym truck arrives at your location 15 minutes before your scheduled session.",
              },
              {
                step: "3",
                title: "Enjoy Your Workout",
                description:
                  "Our certified trainer guides you through a personalized workout tailored to your fitness goals.",
              },
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden border-purple-200">
                <div className="absolute top-0 right-0 bg-purple-600 text-white w-10 h-10 flex items-center justify-center text-lg font-bold">
                  {item.step}
                </div>
                <CardContent className="pt-12 pb-8 px-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 md:py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our mobile gym service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 relative overflow-hidden">
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
              Book your first mobile gym session today and experience the convenience of fitness that comes to you in
              Rajkot.
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
