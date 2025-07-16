import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Sahibinden</h3>
            <p className="text-gray-300 mb-4">
              Turkey's leading classified ads platform. Find properties, vehicles, 
              electronics, and more. Buy, sell, and discover everything you need.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-blue-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-blue-400">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-blue-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/category/real-estate" className="text-gray-300 hover:text-blue-400">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/category/vehicles" className="text-gray-300 hover:text-blue-400">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link href="/category/electronics" className="text-gray-300 hover:text-blue-400">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/category/furniture" className="text-gray-300 hover:text-blue-400">
                  Furniture
                </Link>
              </li>
              <li>
                <Link href="/category/jobs" className="text-gray-300 hover:text-blue-400">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Sahibinden Clone. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/sitemap" className="text-gray-400 hover:text-blue-400 text-sm">
                Sitemap
              </Link>
              <Link href="/advertise" className="text-gray-400 hover:text-blue-400 text-sm">
                Advertise
              </Link>
              <Link href="/careers" className="text-gray-400 hover:text-blue-400 text-sm">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 