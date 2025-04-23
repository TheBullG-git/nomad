import Link from "next/link"
import { Dumbbell, Facebook, Instagram, MapPin, Twitter } from "lucide-react"
import { LocationBadge } from "@/components/location-badge"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <span className="text-xl font-bold">NomadFitness</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Professional fitness training that comes to you. Experience the convenience of a fully-equipped gym, right
              at your doorstep.
            </p>
            <div className="mt-2">
              <LocationBadge variant="subtle" />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/mobile-gym" className="text-muted-foreground hover:text-foreground">
                  Mobile Gym Sessions
                </Link>
              </li>
              <li>
                <Link href="/services/monthly" className="text-muted-foreground hover:text-foreground">
                  Monthly Subscriptions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Connect</h3>
            <div className="flex space-x-4">
              <Link href="https://twitter.com" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://instagram.com" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://facebook.com" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Rajkot, Gujarat 360001</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NomadFitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
