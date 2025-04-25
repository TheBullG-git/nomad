// Central file for all service and pricing information

export interface ServicePlan {
  id: string
  name: string
  price: number
  description: string
}

export interface ServiceCategory {
  id: string
  title: string
  description: string
  icon?: string
  duration?: string
  plans: ServicePlan[]
  features?: string[]
  image?: string
  longDescription?: string
}

// Service categories with their plans
export const serviceCategories: ServiceCategory[] = [
  {
    id: "gym",
    title: "Mobile Gym Session",
    description: "One-on-one training in our fully-equipped mobile gym truck.",
    duration: "60 min",
    image: "/focused-fitness.png",
    longDescription:
      "Experience the ultimate convenience with our signature Mobile Gym Sessions. Our fully-equipped gym truck arrives at your location, bringing a complete fitness center experience to your doorstep. Each session includes a certified personal trainer who will guide you through a customized workout tailored to your fitness goals.",
    features: [
      "Personalized workout plan",
      "Professional trainer guidance",
      "Full access to all equipment",
      "Fitness assessment included",
      "Flexible scheduling",
      "No travel time for you",
    ],
    plans: [
      {
        id: "gym-single",
        name: "Single Session",
        price: 300,
        description: "One-time mobile gym session",
      },
      {
        id: "gym-monthly",
        name: "1 Month Plan",
        price: 7000,
        description: "12 sessions per month (3 per week)",
      },
      {
        id: "gym-quarterly",
        name: "3 Months Plan",
        price: 12000,
        description: "36 sessions over 3 months",
      },
      {
        id: "gym-biannual",
        name: "6 Months Plan",
        price: 20000,
        description: "72 sessions over 6 months",
      },
      {
        id: "gym-annual",
        name: "1 Year Plan",
        price: 25000,
        description: "144 sessions over 12 months",
      },
    ],
  },
  {
    id: "yoga-dance",
    title: "Yoga and Dance",
    description: "Yoga and dance sessions at your preferred location.",
    duration: "60 min",
    image: "/diverse-fitness-session.png",
    longDescription:
      "Our Yoga and Dance sessions bring the studio experience to your doorstep. Whether you're looking to improve flexibility, reduce stress, or express yourself through movement, our certified instructors will guide you through personalized sessions tailored to your preferences and skill level.",
    features: [
      "Certified yoga and dance instructors",
      "Customized routines for all levels",
      "Equipment provided (mats, props, etc.)",
      "Various styles available (Hatha, Vinyasa, Hip-hop, etc.)",
      "Flexible scheduling",
      "Perfect for individuals or small groups",
    ],
    plans: [
      {
        id: "yoga-dance-single",
        name: "Single Session",
        price: 200,
        description: "One-time yoga or dance session",
      },
      {
        id: "yoga-dance-monthly",
        name: "1 Month Plan",
        price: 4000,
        description: "12 sessions per month (3 per week)",
      },
      {
        id: "yoga-dance-quarterly",
        name: "3 Months Plan",
        price: 8000,
        description: "36 sessions over 3 months",
      },
      {
        id: "yoga-dance-biannual",
        name: "6 Months Plan",
        price: 12000,
        description: "72 sessions over 6 months",
      },
      {
        id: "yoga-dance-annual",
        name: "1 Year Plan",
        price: 18000,
        description: "144 sessions over 12 months",
      },
    ],
  },
]

// Helper function to get a service category by ID
export function getServiceCategory(id: string): ServiceCategory | undefined {
  return serviceCategories.find((category) => category.id === id)
}

// Helper function to get a specific plan
export function getServicePlan(categoryId: string, planId: string): ServicePlan | undefined {
  const category = getServiceCategory(categoryId)
  if (!category) return undefined
  return category.plans.find((plan) => plan.id === planId)
}

// Helper function to get all plans across all categories
export function getAllServicePlans(): ServicePlan[] {
  return serviceCategories.flatMap((category) => category.plans)
}
