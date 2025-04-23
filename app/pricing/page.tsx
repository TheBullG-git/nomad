"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const features = [
  "Access to mobile gym truck",
  "Professional trainer guidance",
  "Personalized workout plans",
  "Fitness progress tracking",
  "Nutritional guidance",
  "Priority booking",
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  return (
    <div className="container py-12 md:py-24">
      <div className="text-center mb-12">
        <motion.h1
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p
          className="text-xl text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Choose the plan that fits your fitness journey
        </motion.p>
      </div>

      <div className="flex justify-center mb-8">
        <Tabs defaultValue="monthly" value={billingCycle} onValueChange={setBillingCycle} className="w-full max-w-md">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Single Session Plan */}
        <Card className="border-purple-200 hover:border-purple-300 transition-colors">
          <CardHeader>
            <CardTitle>Single Session</CardTitle>
            <CardDescription>Perfect for trying out our service</CardDescription>
            <div className="mt-4 text-3xl font-bold">INR 300</div>
            <p className="text-sm text-muted-foreground">per session</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {features.slice(0, 2).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/booking">Book Now</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* 1 Month Plan */}
        <Card className="border-purple-200 hover:border-purple-300 transition-colors">
          <CardHeader>
            <CardTitle>1 Month</CardTitle>
            <CardDescription>Regular fitness commitment</CardDescription>
            <div className="mt-4 text-3xl font-bold">INR 7,000</div>
            <p className="text-sm text-muted-foreground">billed monthly</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {features.slice(0, 3).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/booking">Subscribe</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* 3 Month Plan */}
        <Card className="border-purple-500 bg-purple-50 dark:bg-purple-950/20 hover:border-purple-600 transition-colors">
          <CardHeader>
            <div className="bg-purple-600 text-white text-xs font-medium px-3 py-1 rounded-full w-fit mb-3">
              POPULAR
            </div>
            <CardTitle>3 Months</CardTitle>
            <CardDescription>Best value for committed training</CardDescription>
            <div className="mt-4 text-3xl font-bold">INR 15,000</div>
            <p className="text-sm text-muted-foreground">INR 5,000 per month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {features.slice(0, 5).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/booking">Subscribe</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* 6 Month Plan */}
        <Card className="border-purple-200 hover:border-purple-300 transition-colors">
          <CardHeader>
            <CardTitle>6 Months</CardTitle>
            <CardDescription>Long-term fitness journey</CardDescription>
            <div className="mt-4 text-3xl font-bold">INR 20,000</div>
            <p className="text-sm text-muted-foreground">INR 3,333 per month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {features.slice(0, 5).map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/booking">Subscribe</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* 1 Year Plan */}
        <Card className="border-purple-200 hover:border-purple-300 transition-colors">
          <CardHeader>
            <CardTitle>1 Year</CardTitle>
            <CardDescription>Ultimate fitness transformation</CardDescription>
            <div className="mt-4 text-3xl font-bold">INR 25,000</div>
            <p className="text-sm text-muted-foreground">INR 2,083 per month</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-purple-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
              <Link href="/booking">Subscribe</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How many sessions do I get?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monthly plans include 12 sessions per month (3 per week). You can schedule these at your convenience
                through our booking system.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I cancel my subscription?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can cancel your subscription at any time. For monthly plans, you'll have access until the end
                of your billing period.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Are there any hidden fees?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                No hidden fees. The price you see is what you pay. All equipment, trainer guidance, and mobile gym
                access are included.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I share my subscription?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Subscriptions are for individual use only. For group sessions, we offer special group rates that can be
                discussed with our team.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">Contact our team for more information about our pricing plans.</p>
        <Button asChild variant="outline" size="lg">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}
