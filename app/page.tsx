'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdCard from '@/components/AdCard'
import { 
  Home as HomeIcon, 
  Car, 
  Smartphone, 
  Sofa, 
  Briefcase, 
  Wrench,
  Search,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Mock data
const categories = [
  { name: 'Real Estate', href: '/category/real-estate', count: 15420, color: 'bg-blue-500', iconIndex: 0 },
  { name: 'Vehicles', href: '/category/vehicles', count: 8920, color: 'bg-green-500', iconIndex: 1 },
  { name: 'Electronics', href: '/category/electronics', count: 12340, color: 'bg-purple-500', iconIndex: 2 },
  { name: 'Furniture', href: '/category/furniture', count: 5670, color: 'bg-orange-500', iconIndex: 3 },
  { name: 'Jobs', href: '/category/jobs', count: 3450, color: 'bg-red-500', iconIndex: 4 },
  { name: 'Services', href: '/category/services', count: 7890, color: 'bg-indigo-500', iconIndex: 5 },
]

const featuredAds = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Apartment in Istanbul',
    price: '₺2,500,000',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    category: 'Real Estate',
    postedDate: '2 hours ago',
  },
  {
    id: '2',
    title: '2020 BMW 3 Series - Excellent Condition',
    price: '₺850,000',
    location: 'Ankara, Turkey',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    category: 'Vehicles',
    postedDate: '1 day ago',
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max - 256GB',
    price: '₺45,000',
    location: 'Izmir, Turkey',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: 'Electronics',
    postedDate: '3 hours ago',
  },
  {
    id: '4',
    title: 'Leather Sofa Set - Living Room Furniture',
    price: '₺12,000',
    location: 'Bursa, Turkey',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    category: 'Furniture',
    postedDate: '5 hours ago',
  },
  {
    id: '5',
    title: 'Senior Software Developer Position',
    price: '₺25,000/month',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    category: 'Jobs',
    postedDate: '1 day ago',
  },
  {
    id: '6',
    title: 'Professional Cleaning Services',
    price: '₺200/hour',
    location: 'Antalya, Turkey',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    category: 'Services',
    postedDate: '4 hours ago',
  },
]

// Separate component for category card to avoid circular references
function CategoryCard({ name, href, count, color, iconIndex }: {
  name: string
  href: string
  count: number
  color: string
  iconIndex: number
}) {
  const getIcon = (index: number) => {
    switch (index) {
      case 0: return <HomeIcon className="h-8 w-8 text-white" />
      case 1: return <Car className="h-8 w-8 text-white" />
      case 2: return <Smartphone className="h-8 w-8 text-white" />
      case 3: return <Sofa className="h-8 w-8 text-white" />
      case 4: return <Briefcase className="h-8 w-8 text-white" />
      case 5: return <Wrench className="h-8 w-8 text-white" />
      default: return <HomeIcon className="h-8 w-8 text-white" />
    }
  }

  return (
    <a href={href} className="block">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 p-6 text-center group">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
          {getIcon(iconIndex)}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-500 text-sm">{count.toLocaleString()} ads</p>
      </div>
    </a>
  )
}

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All Categories')

  // Filter/Sort state
  const [showFilters, setShowFilters] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('Latest')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [postedDate, setPostedDate] = useState('Any time')

  // Helper to parse price string to number
  const parsePrice = (price: string) => {
    const match = price.match(/\d+[\d,.]*/)
    if (!match) return 0
    return Number(match[0].replace(/\./g, '').replace(/,/g, ''))
  }

  // Helper to check posted date
  const isWithinPostedDate = (adPostedDate: string) => {
    if (postedDate === 'Any time') return true
    if (adPostedDate.includes('hour')) {
      if (postedDate === 'Last 24 hours') return true
      if (postedDate === 'Last 7 days') return true
    }
    if (adPostedDate.includes('day')) {
      const days = parseInt(adPostedDate)
      if (postedDate === 'Last 24 hours') return days <= 1
      if (postedDate === 'Last 7 days') return days <= 7
    }
    return false
  }

  // Unique categories and locations for filter dropdowns
  const filterCategories = ['All Categories', ...Array.from(new Set(featuredAds.map(ad => ad.category)))]
  const locations = ['All Locations', ...Array.from(new Set(featuredAds.map(ad => ad.location)))]
  const postedDateOptions = ['Any time', 'Last 24 hours', 'Last 7 days']

  // Filter and sort featured ads
  let filteredAds = featuredAds.filter(ad => {
    const matchesQuery = searchQuery === '' || 
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || selectedCategory === '' || ad.category === selectedCategory
    const priceValue = parsePrice(ad.price)
    const matchesMin = minPrice === '' || priceValue >= Number(minPrice)
    const matchesMax = maxPrice === '' || priceValue <= Number(maxPrice)
    const matchesLocation = selectedLocation === 'All Locations' || ad.location === selectedLocation
    const matchesPostedDate = isWithinPostedDate(ad.postedDate)
    return matchesQuery && matchesCategory && matchesMin && matchesMax && matchesLocation && matchesPostedDate
  })

  if (sortBy === 'Price: Low to High') {
    filteredAds = [...filteredAds].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
  } else if (sortBy === 'Price: High to Low') {
    filteredAds = [...filteredAds].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
  } else if (sortBy === 'Latest') {
    filteredAds = [...filteredAds].sort((a, b) => Number(b.id) - Number(a.id))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery.trim()) {
      params.set('q', searchQuery.trim())
    }
    if (selectedCategory && selectedCategory !== 'All Categories') {
      params.set('category', selectedCategory)
    }
    
    const searchUrl = `/search?${params.toString()}`
    router.push(searchUrl)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Everything You Need
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Turkey's largest classified ads platform
            </p>
            
            {/* Search Section */}
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <select 
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>All Categories</option>
                      <option>Real Estate</option>
                      <option>Vehicles</option>
                      <option>Electronics</option>
                      <option>Furniture</option>
                      <option>Jobs</option>
                      <option>Services</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Categories</h2>
            <p className="text-gray-600 text-lg">Find what you're looking for in our extensive categories</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                href={category.href}
                count={category.count}
                color={category.color}
                iconIndex={category.iconIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Ads Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Ads</h2>
              <p className="text-gray-600">Handpicked listings for you</p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded transition-colors duration-200 ${showFilters ? 'bg-blue-600 text-white' : 'text-blue-600 hover:text-blue-700'}`}
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  className="border border-gray-300 rounded px-3 py-1 text-sm text-black bg-white"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
          </div>
          {/* Filter Modal */}
          {showFilters && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowFilters(false)}
                  aria-label="Close"
                >
                  ×
                </button>
                <h2 className="text-lg font-semibold mb-4 text-black">Filters</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-1">Category</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                  >
                    {filterCategories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-1">Location</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                    value={selectedLocation}
                    onChange={e => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4 flex space-x-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black mb-1">Min Price</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                      placeholder="0"
                      value={minPrice}
                      onChange={e => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-black mb-1">Max Price</label>
                    <input
                      type="number"
                      className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                      placeholder="10000000"
                      value={maxPrice}
                      onChange={e => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-black mb-1">Posted Date</label>
                  <select
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black"
                    value={postedDate}
                    onChange={e => setPostedDate(e.target.value)}
                  >
                    {postedDateOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <AdCard
                key={ad.id}
                id={ad.id}
                title={ad.title}
                price={ad.price}
                location={ad.location}
                image={ad.image}
                category={ad.category}
                postedDate={ad.postedDate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Sahibinden?</h2>
            <p className="text-blue-100 text-lg">Trusted by millions of users across Turkey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50M+</div>
              <div className="text-blue-100">Monthly Visitors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">2M+</div>
              <div className="text-blue-100">Active Listings</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-100">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
} "// Trigger Vercel deployment"  
