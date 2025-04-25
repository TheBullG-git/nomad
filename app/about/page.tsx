"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const founders = [
  {
    name: "Nand Vachhani",
    role: "Founder & CEO",
    bio: "With a background in business management and a passion for fitness innovation, Nand leads the strategic vision of NomadFit. Their expertise in mobile service delivery has been instrumental in creating our unique business model that brings fitness directly to clients.",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
    },
  },
  {
    name: "Arham Malu",
    role: "Founder & COO",
    bio: "Arham oversees the operational excellence of NomadFit's mobile fitness fleet. With extensive experience in logistics and customer experience design, they ensure that every NomadFit session delivers the highest quality service regardless of location.",
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

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">About Nomad Fit</h1>
          <p className="mb-6 text-lg text-muted-foreground">
            We think fitness and fun should meet you where you are. We're a mobile dance and fitness studio bringing
            movement, motivation, and music to your doorstep.
          </p>
          <Link href="/contact" passHref>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Get in Touch</Button>
          </Link>
        </div>
        <div className="relative h-[300px] w-full md:h-[400px]">
          <Image src="/diverse-group-workout.png" alt="NomadFitness Team" fill className="rounded-lg object-cover" />
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground">About The Firm</h2>
        <div className="mx-auto max-w-3xl rounded-lg border border-border bg-card p-8 shadow-sm">
          <ul className="space-y-6 text-muted-foreground">
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <p>
                At Nomad Fit, we think fitness and fun should meet you where you are. We're a mobile dance and fitness
                studio with a mission to bring movement, motivation, and music to your doorstep—your living room,
                office, local park, or community center.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <p>Nomad Fit was born with a single mission: to make wellness more accessible, flexible, and fun.</p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <p>
                Our dynamic group of certified, enthusiastic instructors offers high-energy dance and fitness classes
                designed for your lifestyle, space, and objectives.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <p>
                From dance cardio, Zumba, and HIIT to yoga and toning workouts, we make it easy to move your body,
                brighten your mood, and dominate your fitness goals—gym not necessary.
              </p>
            </li>
            <li className="flex items-start">
              <span className="mr-2 mt-1 text-primary">•</span>
              <p>
                Whether you're a busy professional, a parent with a packed schedule, or someone looking to rediscover
                the joy of movement, Nomad Fit makes fitness flexible, fun, and fiercely effective.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-16">
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-heart"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Accessibility</h3>
            <p className="text-muted-foreground">
              We believe fitness should be accessible to everyone, regardless of location or schedule constraints.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-star"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Fun</h3>
            <p className="text-muted-foreground">
              We believe fitness should be enjoyable and energizing, not a chore. Our classes are designed to bring joy
              to movement.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-users"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground">Flexibility</h3>
            <p className="text-muted-foreground">
              We adapt to your schedule, space, and needs, making fitness work for your lifestyle, not the other way
              around.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Founders Section */}
      <div className="mb-16 bg-muted py-16 rounded-lg">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Meet the Founders</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The visionaries who combined their unique expertise to create Nomad Fit
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <div
                key={founder.name}
                className="flex flex-col items-center text-center bg-background rounded-lg p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold">{founder.name}</h3>
                <p className="text-primary mb-3">{founder.role}</p>
                <p className="text-muted-foreground mb-4">{founder.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Classes */}
      <div className="mb-16">
        <h2 className="mb-6 text-center text-3xl font-bold text-foreground">Our Classes</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image src="/diverse-fitness-session.png" alt="Dance Cardio" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-foreground">Dance Cardio</h3>
              <p className="text-sm text-muted-foreground">
                High-energy dance routines that burn calories while having fun to the beat of popular music.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image src="/focused-fitness.png" alt="Zumba" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-foreground">Zumba</h3>
              <p className="text-sm text-muted-foreground">
                Latin-inspired dance workout that feels more like a party than exercise.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image src="/thriving-workforce.png" alt="HIIT" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-foreground">HIIT</h3>
              <p className="text-sm text-muted-foreground">
                High-intensity interval training for maximum calorie burn in minimum time.
              </p>
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-sm">
            <div className="relative h-48">
              <Image src="/thoughtful-gaze.png" alt="Yoga" fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-lg font-bold text-foreground">Yoga</h3>
              <p className="text-sm text-muted-foreground">
                Mindful movement and breathing practices to improve flexibility, strength, and mental clarity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <h2 className="mb-4 text-2xl font-bold text-foreground">Ready to Experience Nomad Fit?</h2>
        <p className="mb-6 text-lg text-muted-foreground">
          Book your first session today and discover the convenience of fitness that comes to you.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/booking" passHref>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Book a Session</Button>
          </Link>
          <Link href="/contact" passHref>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
