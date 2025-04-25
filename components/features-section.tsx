"use client"

import { motion } from "framer-motion"
import { Dumbbell, Users, Calendar, MapPin } from "lucide-react"

const features = [
  {
    icon: <Dumbbell className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Premium Equipment",
    description:
      "Access state-of-the-art fitness equipment in our mobile gym, designed for a complete workout experience.",
  },
  {
    icon: <Users className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Expert Trainers",
    description:
      "Our certified trainers provide personalized guidance to help you achieve your fitness goals effectively.",
  },
  {
    icon: <Calendar className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Flexible Scheduling",
    description: "Book sessions at times that work for you, with early morning and evening slots available.",
  },
  {
    icon: <MapPin className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Convenient Location",
    description: "We come to your location - home, office, or community space - saving you travel time.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Choose <span className="text-primary">NomadFitness</span>
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Experience the benefits of a gym without the commute or crowded spaces
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-6 md:p-8 rounded-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg md:text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
