import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { ServicesSection } from "@/components/services-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <main className="relative">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <CTASection />
      <Footer />
    </main>
  )
}
