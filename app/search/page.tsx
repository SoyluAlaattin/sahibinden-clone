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
  const category = searchParams.category || ''

  // Filter ads based on search query and category
  const filteredAds = allAds.filter(ad => {
    const matchesQuery = query === '' || 
      ad.title.toLowerCase().includes(query.toLowerCase()) ||
      ad.location.toLowerCase().includes(query.toLowerCase()) ||
      ad.category.toLowerCase().includes(query.toLowerCase())
    
    const matchesCategory = category === '' || category === 'All Categories' || 
      ad.category === category

    return matchesQuery && matchesCategory
  })

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
              Showing results for "{query}" {category && category !== 'All Categories' ? `in ${category}` : ''}
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
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <Filter className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Sort by:</span>
                <select className="border border-gray-300 rounded px-3 py-1 text-sm">
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