"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Check, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LocationBadge } from "@/components/location-badge"
import { getServiceCategory } from "@/lib/services-data"
import { notFound } from "next/navigation"

const equipmentList = {
  gym: [
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
  ],
  "yoga-dance": [
    {
      category: "Yoga Equipment",
      items: [
        "Premium yoga mats",
        "Yoga blocks and straps",
        "Bolsters and cushions",
        "Meditation pillows",
        "Yoga wheels",
        "Resistance bands",
      ],
    },
    {
      category: "Dance Equipment",
      items: [
        "Portable dance floor",
        "Portable barre",
        "Resistance bands",
        "Portable sound system",
        "Dance props (as needed)",
        "Mirrors (when possible)",
      ],
    },
    {
      category: "Accessories",
      items: [
        "Towels",
        "Water bottles",
        "Bluetooth speakers",
        "Fitness trackers",
        "Cooling fans",
        "Aromatherapy diffusers",
      ],
    },
  ],
}

const faqs = {
  gym: [
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
  ],
  "yoga-dance": [
    {
      question: "What styles of yoga do you offer?",
      answer:
        "We offer a variety of yoga styles including Hatha, Vinyasa, Yin, Restorative, Power Yoga, and more. Our instructors can customize sessions based on your preferences and experience level.",
    },
    {
      question: "What dance styles do you offer?",
      answer:
        "We offer various dance styles including Hip-hop, Contemporary, Bollywood, Classical Indian dance, Zumba, and more. Sessions can be customized based on your interests and skill level.",
    },
    {
      question: "Can I have group sessions?",
      answer:
        "Yes! Our yoga and dance sessions can accommodate small groups. Pricing may vary based on group size. Please contact us for group rates.",
    },
    {
      question: "What should I wear?",
      answer:
        "Comfortable, stretchy clothing that allows for a full range of motion is recommended. For yoga, form-fitting clothes work best so the instructor can see your alignment. For dance, wear comfortable athletic wear and appropriate footwear.",
    },
    {
      question: "Do you provide equipment?",
      answer:
        "Yes, we provide all necessary equipment including yoga mats, blocks, straps, and props. For dance sessions, we bring a portable sound system and any required props.",
    },
  ],
}

export default function ServiceDetailPage() {
  const params = useParams()
  const serviceId = params.serviceId as string

  const service = getServiceCategory(serviceId)

  if (!service) {
    notFound()
  }

  const serviceEquipment = equipmentList[serviceId as keyof typeof equipmentList] || []
  const serviceFaqs = faqs[serviceId as keyof typeof faqs] || []

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#aa4316]/90 to-[#ce8521]/90 z-10" />
        <Image
          src={service.image || "/mobile-fitness-unit.png"}
          alt={`NomadFitness ${service.title}`}
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
            {service.title}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {service.description}
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
                  src={service.image || "/focused-fitness.png"}
                  alt={service.title}
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
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    {service.duration}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground">{service.longDescription}</p>

              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div
                        className="mr-2 mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: "#ce8521" }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.plans.map((plan) => (
                    <div key={plan.id} className="flex justify-between border-b pb-2">
                      <span>{plan.name}:</span>
                      <span className="font-semibold">₹{plan.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  style={{ backgroundColor: "#ce8521", borderColor: "#ce8521" }}
                  className="hover:bg-[#b97a1e]"
                >
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Equipment</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our mobile services are fully equipped with premium equipment to provide a comprehensive experience.
            </p>
          </div>

          <Tabs
            defaultValue={serviceEquipment[0]?.category.toLowerCase().split(" ")[0] || "strength"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {serviceEquipment.map((category) => (
                <TabsTrigger key={category.category} value={category.category.toLowerCase().split(" ")[0]}>
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>
            {serviceEquipment.map((category) => (
              <TabsContent key={category.category} value={category.category.toLowerCase().split(" ")[0]}>
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
                          <Check className="mr-2 h-4 w-4" style={{ color: "#ce8521" }} />
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg overflow-hidden">
                    <Image
                      src={
                        category.category.includes("Strength") || category.category.includes("Yoga")
                          ? "/modern-gym-floor.png"
                          : category.category.includes("Cardio") || category.category.includes("Dance")
                            ? "/modern-gym-cardio.png"
                            : "/gym-recovery-zone.png"
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
              Booking a session is simple and convenient. Here's what to expect.
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
                  "Our fully-equipped mobile service arrives at your location 15 minutes before your scheduled session.",
              },
              {
                step: "3",
                title: "Enjoy Your Session",
                description:
                  "Our certified instructor guides you through a personalized session tailored to your goals.",
              },
            ].map((item, index) => (
              <Card key={index} className="relative overflow-hidden border-[#ce8521]/20">
                <div
                  className="absolute top-0 right-0 text-white w-10 h-10 flex items-center justify-center text-lg font-bold"
                  style={{ backgroundColor: "#ce8521" }}
                >
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
              Find answers to common questions about our {service.title.toLowerCase()} service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {serviceFaqs.map((faq, index) => (
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#aa4316]/90 to-[#ce8521]/90 z-10" />
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
              Book your first {service.title.toLowerCase()} session today and experience the convenience of fitness that
              comes to you in Rajkot.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button asChild size="lg" className="bg-white hover:bg-gray-100" style={{ color: "#aa4316" }}>
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
