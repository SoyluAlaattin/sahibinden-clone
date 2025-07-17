import React, { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdCard from '@/components/AdCard'
import { Filter, Grid, List, Search } from 'lucide-react'

interface SearchPageProps {
  searchParams: {
    q?: string
    category?: string
  }
}

// Mock data - in a real app, this would come from a database
const allAds = [
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
  {
    id: '7',
    title: 'Luxury Villa with Sea View',
    price: '₺5,200,000',
    location: 'Antalya, Turkey',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    category: 'Real Estate',
    postedDate: '1 day ago',
  },
  {
    id: '8',
    title: '2018 Mercedes C-Class',
    price: '₺720,000',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop',
    category: 'Vehicles',
    postedDate: '2 days ago',
  },
  {
    id: '9',
    title: 'MacBook Pro M2 - 14 inch',
    price: '₺65,000',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: 'Electronics',
    postedDate: '1 day ago',
  },
  {
    id: '10',
    title: 'Office Space in Business District',
    price: '₺1,800,000',
    location: 'Ankara, Turkey',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
    category: 'Real Estate',
    postedDate: '3 hours ago',
  },
]

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const categoryParam = searchParams.category || ''

  // State for filters and sorting
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All Categories')
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
  const categories = ['All Categories', ...Array.from(new Set(allAds.map(ad => ad.category)))]
  const locations = ['All Locations', ...Array.from(new Set(allAds.map(ad => ad.location)))]
  const postedDateOptions = ['Any time', 'Last 24 hours', 'Last 7 days']

  // Filter ads based on all criteria
  let filteredAds = allAds.filter(ad => {
    const matchesQuery = query === '' || 
      ad.title.toLowerCase().includes(query.toLowerCase()) ||
      ad.location.toLowerCase().includes(query.toLowerCase()) ||
      ad.category.toLowerCase().includes(query.toLowerCase())
    const matchesCategory = selectedCategory === 'All Categories' || selectedCategory === '' || ad.category === selectedCategory
    const priceValue = parsePrice(ad.price)
    const matchesMin = minPrice === '' || priceValue >= Number(minPrice)
    const matchesMax = maxPrice === '' || priceValue <= Number(maxPrice)
    const matchesLocation = selectedLocation === 'All Locations' || ad.location === selectedLocation
    const matchesPostedDate = isWithinPostedDate(ad.postedDate)
    return matchesQuery && matchesCategory && matchesMin && matchesMax && matchesLocation && matchesPostedDate
  })

  // Sort ads
  if (sortBy === 'Price: Low to High') {
    filteredAds = [...filteredAds].sort((a, b) => parsePrice(a.price) - parsePrice(b.price))
  } else if (sortBy === 'Price: High to Low') {
    filteredAds = [...filteredAds].sort((a, b) => parsePrice(b.price) - parsePrice(a.price))
  } else if (sortBy === 'Latest') {
    filteredAds = [...filteredAds].sort((a, b) => Number(b.id) - Number(a.id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results
          </h1>
          {query && (
            <p className="text-gray-600">
              Showing results for "{query}" {selectedCategory && selectedCategory !== 'All Categories' ? `in ${selectedCategory}` : ''}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-2">
            {filteredAds.length} ads found
          </p>
        </div>
        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
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
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 text-sm">{filteredAds.length} ads found</span>
              <div className="flex border border-gray-300 rounded">
                <button className="p-2 text-blue-600 bg-blue-50">
                  <Grid className="h-4 w-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600">
                  <List className="h-4 w-4" />
                </button>
              </div>
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
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value)}
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="0"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    placeholder="10000000"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Posted Date</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2"
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
        {/* Search Results */}
        {filteredAds.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or browse our categories
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Real Estate', 'Vehicles', 'Electronics', 'Furniture', 'Jobs', 'Services'].map((cat) => (
                <a
                  key={cat}
                  href={`/category/${cat.toLowerCase().replace(' ', '-')}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredAds.length > 0 && (
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
              Load More Ads
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 