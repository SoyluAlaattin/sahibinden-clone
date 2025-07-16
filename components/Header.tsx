'use client'

import { useState } from 'react'
import { Search, Menu, User, Heart, Plus, Bell } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const categories = [
    { name: 'Real Estate', href: '/category/real-estate' },
    { name: 'Vehicles', href: '/category/vehicles' },
    { name: 'Electronics', href: '/category/electronics' },
    { name: 'Furniture', href: '/category/furniture' },
    { name: 'Jobs', href: '/category/jobs' },
    { name: 'Services', href: '/category/services' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      const searchUrl = `/search?q=${encodeURIComponent(searchQuery.trim())}`
      router.push(searchUrl)
    }
  }

  return (
    <header className="bg-white shadow-sm border-b">
      {/* Top bar */}
      <div className="bg-blue-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm">
            <div className="flex space-x-4">
              <Link href="/" className="hover:text-blue-200">Home</Link>
              <Link href="/about" className="hover:text-blue-200">About</Link>
              <Link href="/contact" className="hover:text-blue-200">Contact</Link>
            </div>
            <div className="flex space-x-4">
              <Link href="/login" className="hover:text-blue-200">Login</Link>
              <Link href="/register" className="hover:text-blue-200">Register</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">Sahibinden</div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
              <button type="submit" className="absolute left-3 top-2.5">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <Heart className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <Bell className="h-6 w-6" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Post Ad</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-600">
              <User className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-blue-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Categories */}
        <div className="hidden lg:flex space-x-8 py-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="block py-2 text-gray-600 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
} 