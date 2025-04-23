"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

const founders = [
  {
    name: "Nandvachhani",
    role: "Founder & CEO",
    bio: "With a background in business management and a passion for fitness innovation, Nandvachhani leads the strategic vision of NomadFit. Their expertise in mobile service delivery has been instrumental in creating our unique business model that brings fitness directly to clients.",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "ARHAM MALU",
    role: "Founder & COO",
    bio: "Arham oversees the operational excellence of NomadFit's mobile gym fleet. With extensive experience in logistics and customer experience design, they ensure that every NomadFit session delivers the highest quality service regardless of location.",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Dhruvi Motivaras",
    role: "Founder & Fitness Director",
    bio: "A certified fitness professional with specializations in personalized training programs, Dhruvi leads our training methodology and curriculum development. Their innovative approach to mobile fitness programming ensures clients receive world-class training regardless of setting.",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
]

const values = [
  {
    title: "Accessibility",
    description: "We believe fitness should be accessible to everyone, regardless of location or schedule constraints.",
    founderConnection: "Inspired by Nandvachhani's vision to remove barriers to fitness.",
  },
  {
    title: "Innovation",
    description:
      "We continuously seek new ways to improve the mobile fitness experience through technology and creative solutions.",
    founderConnection: "Driven by Arham's commitment to operational excellence and service delivery.",
  },
  {
    title: "Personalization",
    description: "Every fitness journey is unique, and we tailor our approach to meet individual needs and goals.",
    founderConnection: "Developed through Dhruvi's expertise in customized fitness programming.",
  },
  {
    title: "Excellence",
    description: "We maintain the highest standards in equipment, training methods, and customer service.",
    founderConnection: "A shared core value among all three founders that guides every aspect of our business.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10" />
        <Image
          src="/modern-gym-floor.png"
          alt="NomadFitness Gym"
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
            About Us
          </motion.h1>
          <motion.p
            className="mt-6 max-w-3xl text-lg text-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            NomadFit is a mobile fitness solution designed for today's fast-paced world. Our mission is to bring
            world-class gym experiences directly to our clients—wherever they are.
          </motion.p>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Our Vision</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="text-lg">
                  NomadFit is a mobile fitness solution designed for today's fast-paced world. Our mission is to bring
                  world-class gym experiences directly to our clients—wherever they are. Whether it's at a corporate
                  office, residential complex, school, or park, NomadFit redefines accessibility and convenience in
                  fitness.
                </p>
                <p>
                  Founded by three visionaries with complementary expertise—Nandvachhani, ARHAM MALU, and Dhruvi
                  Motivaras—NomadFit represents the convergence of business innovation, operational excellence, and
                  fitness expertise.
                </p>
                <p>
                  Our founders recognized that despite the growing awareness of fitness benefits, many people struggle
                  to maintain consistent workout routines due to time constraints, travel difficulties, or lack of
                  convenient gym access. Their solution: bring the gym to you.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image src="/mobile-fitness-unit.png" alt="NomadFitness Mobile Gym" fill className="object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Founders Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the Founders</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionaries who combined their unique expertise to create NomadFit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                className="flex flex-col items-center text-center bg-background rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold">{founder.name}</h3>
                <p className="text-purple-600 dark:text-purple-400 mb-3">{founder.role}</p>
                <p className="text-muted-foreground mb-4">{founder.bio}</p>
                <div className="flex space-x-3">
                  {founder.social.linkedin && (
                    <a
                      href={founder.social.linkedin}
                      className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                      aria-label={`${founder.name}'s LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {founder.social.twitter && (
                    <a
                      href={founder.social.twitter}
                      className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                      aria-label={`${founder.name}'s Twitter`}
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                  )}
                  {founder.social.instagram && (
                    <a
                      href={founder.social.instagram}
                      className="p-2 rounded-full bg-background border hover:bg-muted transition-colors"
                      aria-label={`${founder.name}'s Instagram`}
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Our Core Values</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide our founders and shape everything we do at NomadFit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-muted p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground mb-3">{value.description}</p>
                <p className="text-sm italic text-purple-600 dark:text-purple-400">{value.founderConnection}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden order-2 lg:order-1"
            >
              <Image
                src="/modern-gym-cardio.png"
                alt="NomadFitness Mobile Gym Interior"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Our Approach</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Under the leadership of our founders, NomadFit has developed a unique approach to mobile fitness that
                  combines convenience with quality. Our fleet of fully-equipped mobile gym trucks brings the complete
                  fitness experience to your location.
                </p>
                <p>
                  Nandvachhani's business acumen ensures we remain innovative and client-focused. ARHAM MALU's
                  operational expertise guarantees a seamless experience from booking to workout. Dhruvi's fitness
                  knowledge ensures every session delivers results.
                </p>
                <p>
                  Today, NomadFit operates across multiple locations, helping thousands of clients achieve their fitness
                  goals without the hassle of commuting to a traditional gym. Our innovative approach has revolutionized
                  how people think about fitness accessibility.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Join the NomadFit Community</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Experience the convenience of fitness that comes to you. Book your first session today and start your
              journey with NomadFit.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/booking">Book a Session</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
