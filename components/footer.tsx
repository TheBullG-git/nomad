import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="relative h-10 w-10 mr-2">
                <Image src="/nomadfit-icon.png" alt="NomadFit" width={40} height={40} className="object-contain" />
              </div>
              <span className="text-xl font-bold text-white">NomadFit</span>
            </Link>
            <p className="text-gray-400 text-sm md:text-base">
              Bringing fitness to your doorstep. Experience the convenience of a mobile gym.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link href="/services/mobile-gym" className="text-gray-400 hover:text-white transition-colors">
                  Mobile Gym
                </Link>
              </li>
              <li>
                <Link href="/services/yoga-dance" className="text-gray-400 hover:text-white transition-colors">
                  Yoga & Dance
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-gray-400 text-sm md:text-base">Email: info@nomadfitness.com</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} NomadFitness. All rights reserved.</p>
          <p className="mt-2 text-sm md:text-base">Serving in Rajkot</p>
        </div>
      </div>
    </footer>
  )
}
