"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { Dumbbell, Users, Music } from "lucide-react"

interface AboutItemProps {
  icon: React.ReactNode
  title: string
  description: string
}

function AboutItem({ icon, title, description }: AboutItemProps) {
  return (
    <div className="flex items-start">
      <div className="mr-4 rounded-full bg-primary/10 p-3">{icon}</div>
      <div>
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            About <span className="text-gradient">Nomad Fit</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            We think fitness and fun should meet you where you are
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center space-y-8">
            <AboutItem
              icon={<Dumbbell className="h-6 w-6 text-primary" />}
              title="Our Mission"
              description="Nomad Fit was born with a single mission: to make wellness more accessible, flexible, and fun by bringing the gym experience directly to you."
            />

            <AboutItem
              icon={<Users className="h-6 w-6 text-primary" />}
              title="Our Team"
              description="Our dynamic group of certified, enthusiastic instructors offers high-energy fitness classes designed for your lifestyle, space, and objectives."
            />

            <AboutItem
              icon={<Music className="h-6 w-6 text-primary" />}
              title="Our Approach"
              description="From dance cardio and HIIT to yoga and strength training, we make it easy to move your body, brighten your mood, and achieve your fitness goals—no gym membership necessary."
            />
          </div>

          <motion.div
            className="overflow-hidden rounded-xl shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-g0MJ9sTeZe4VRsbPqexl457HkmjdI8.png"
              alt="Group fitness class"
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
