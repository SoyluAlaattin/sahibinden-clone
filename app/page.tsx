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
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple header for testing */}
      <header className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-600">Sahibinden Clone</h1>
        </div>
      </header>
      
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
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="What are you looking for?"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option>All Categories</option>
                      <option>Real Estate</option>
                      <option>Vehicles</option>
                      <option>Electronics</option>
                      <option>Furniture</option>
                      <option>Jobs</option>
                      <option>Services</option>
                    </select>
                  </div>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                    Search
                  </button>
                </div>
              </div>
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
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Ads</h2>
              <p className="text-gray-600">Handpicked listings for you</p>
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold">
              <Filter className="h-5 w-5" />
              <span>View All</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAds.map((ad) => (
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
} 