"use client";
export const dynamic = "force-dynamic";
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdCard from '@/components/AdCard'
import { Filter, SortAsc, Grid, List, Home as HomeIcon, Car, Smartphone, Sofa, Briefcase, Wrench } from 'lucide-react'
import { useState, useEffect } from 'react'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Category mapping
const getCategoryInfo = (slug: string) => {
  const categories = {
    'real-estate': {
      name: 'Real Estate',
      description: 'Find your dream home, apartment, or commercial property',
      elasticsearchCategory: 'Real Estate'
    },
    'vehicles': {
      name: 'Vehicles',
      description: 'Cars, motorcycles, boats, and other vehicles for sale',
      elasticsearchCategory: 'Vehicles'
    },
    'electronics': {
      name: 'Electronics',
      description: 'Latest gadgets, computers, and electronic devices',
      elasticsearchCategory: 'Electronics'
    }
  }
  
  return categories[slug as keyof typeof categories] || categories['real-estate']
}

// Fetch ads from Elasticsearch
const fetchAdsFromElasticsearch = async (category: string, searchQuery?: string) => {
  try {
    const params = new URLSearchParams({
      type: 'category',
      category: category
    })
    
    if (searchQuery) {
      params.append('q', searchQuery)
    }
    
    const response = await fetch(`/api/elasticsearch/search?${params}`)
    const data = await response.json()
    
    if (response.ok) {
      return data.ads.map((ad: any) => ({
        ...ad,
        price: `₺${ad.price.toLocaleString()}`,
        postedDate: new Date(ad.postedDate).toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'short'
        })
      }))
    } else {
      console.error('Elasticsearch error:', data.error)
      return []
    }
  } catch (error) {
    console.error('Failed to fetch ads:', error)
    return []
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const categoryInfo = getCategoryInfo(params.slug)
  const [ads, setAds] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // Filter/Sort state
  const [showFilters, setShowFilters] = useState(false)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [sortBy, setSortBy] = useState('Latest')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [postedDate, setPostedDate] = useState('Any time')

  // Load ads from Elasticsearch
  useEffect(() => {
    const loadAds = async () => {
      setLoading(true)
      const fetchedAds = await fetchAdsFromElasticsearch(categoryInfo.elasticsearchCategory, searchQuery)
      setAds(fetchedAds)
      setLoading(false)
    }
    
    loadAds()
  }, [categoryInfo.elasticsearchCategory, searchQuery])

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

  // Unique locations for filter dropdown
  const locations = ['All Locations', ...Array.from(new Set(ads.map((ad: any) => ad.location)))]
  const postedDateOptions = ['Any time', 'Last 24 hours', 'Last 7 days']

  // Filter and sort ads
  let filteredAds = ads.filter((ad: any) => {
    const priceValue = parsePrice(ad.price)
    const matchesMin = minPrice === '' || priceValue >= Number(minPrice)
    const matchesMax = maxPrice === '' || priceValue <= Number(maxPrice)
    const matchesLocation = selectedLocation === 'All Locations' || ad.location === selectedLocation
    const matchesPostedDate = isWithinPostedDate(ad.postedDate)
    return matchesMin && matchesMax && matchesLocation && matchesPostedDate
  })

  if (sortBy === 'Price: Low to High') {
    filteredAds = [...filteredAds].sort((a: any, b: any) => parsePrice(a.price) - parsePrice(b.price))
  } else if (sortBy === 'Price: High to Low') {
    filteredAds = [...filteredAds].sort((a: any, b: any) => parsePrice(b.price) - parsePrice(a.price))
  } else if (sortBy === 'Latest') {
    filteredAds = [...filteredAds].sort((a: any, b: any) => Number(b.id) - Number(a.id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{categoryInfo.name}</span>
        </nav>
        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{categoryInfo.name}</h1>
          <p className="text-gray-600">{categoryInfo.description}</p>
          
          {/* Search Box */}
          <div className="mt-4">
            <div className="relative">
              <input
                type="text"
                placeholder={`Search in ${categoryInfo.name.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {loading && (
                <div className="absolute right-3 top-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded transition-colors duration-200 ${showFilters ? 'bg-blue-600 text-white' : 'text-blue-600 hover:text-blue-700'}`}
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-5 w-5" />
                <span className={showFilters ? 'text-white' : 'text-black'}>Filters</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-black">Sort by:</span>
                <select
                  className="border border-gray-300 rounded px-3 py-1 text-sm text-black bg-white"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option className="text-black">Latest</option>
                  <option className="text-black">Price: Low to High</option>
                  <option className="text-black">Price: High to Low</option>
                  <option className="text-black">Most Popular</option>
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
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative text-black">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setShowFilters(false)}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-lg font-semibold mb-4 text-black">Filters</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Location</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white"
                  value={selectedLocation}
                  onChange={e => setSelectedLocation(e.target.value)}
                >
                  {locations.map(loc => (
                    <option key={loc} value={loc} className="text-black">{loc}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4 flex space-x-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-1">Min Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white"
                    placeholder="0"
                    value={minPrice}
                    onChange={e => setMinPrice(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-black mb-1">Max Price</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white"
                    placeholder="10000000"
                    value={maxPrice}
                    onChange={e => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black mb-1">Posted Date</label>
                <select
                  className="w-full border border-gray-300 rounded px-3 py-2 text-black bg-white"
                  value={postedDate}
                  onChange={e => setPostedDate(e.target.value)}
                >
                  {postedDateOptions.map(opt => (
                    <option key={opt} value={opt} className="text-black">{opt}</option>
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
        {/* Ads Grid */}
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
        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
            Load More Ads
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
} 