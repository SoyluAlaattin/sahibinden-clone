import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdCard from '@/components/AdCard'
import { Filter, SortAsc, Grid, List, Home as HomeIcon, Car, Smartphone, Sofa, Briefcase, Wrench } from 'lucide-react'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

// Mock category data
const getCategoryData = (slug: string) => {
  const categories = {
    'real-estate': {
      name: 'Real Estate',
      description: 'Find your dream home, apartment, or commercial property',
      ads: [
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
          title: 'Luxury Villa with Sea View',
          price: '₺5,200,000',
          location: 'Antalya, Turkey',
          image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
          category: 'Real Estate',
          postedDate: '1 day ago',
        },
        {
          id: '3',
          title: 'Office Space in Business District',
          price: '₺1,800,000',
          location: 'Ankara, Turkey',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
          category: 'Real Estate',
          postedDate: '3 hours ago',
        },
        {
          id: '4',
          title: 'Studio Apartment for Rent',
          price: '₺8,500/month',
          location: 'Izmir, Turkey',
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',
          category: 'Real Estate',
          postedDate: '5 hours ago',
        },
        {
          id: '5',
          title: 'Family House with Garden',
          price: '₺3,800,000',
          location: 'Bursa, Turkey',
          image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
          category: 'Real Estate',
          postedDate: '1 day ago',
        },
        {
          id: '6',
          title: 'Penthouse with Terrace',
          price: '₺4,500,000',
          location: 'Istanbul, Turkey',
          image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
          category: 'Real Estate',
          postedDate: '4 hours ago',
        },
      ]
    },
    'vehicles': {
      name: 'Vehicles',
      description: 'Cars, motorcycles, boats, and other vehicles for sale',
      ads: [
        {
          id: '7',
          title: '2020 BMW 3 Series - Excellent Condition',
          price: '₺850,000',
          location: 'Ankara, Turkey',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
          category: 'Vehicles',
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
      ]
    },
    'electronics': {
      name: 'Electronics',
      description: 'Latest gadgets, computers, and electronic devices',
      ads: [
        {
          id: '9',
          title: 'iPhone 15 Pro Max - 256GB',
          price: '₺45,000',
          location: 'Izmir, Turkey',
          image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
          category: 'Electronics',
          postedDate: '3 hours ago',
        },
        {
          id: '10',
          title: 'MacBook Pro M2 - 14 inch',
          price: '₺65,000',
          location: 'Istanbul, Turkey',
          image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
          category: 'Electronics',
          postedDate: '1 day ago',
        },
      ]
    }
  }
  
  return categories[slug as keyof typeof categories] || categories['real-estate']
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryData(params.slug)

  // Optionally, you can show an icon for the category using a mapping here if needed
  // const iconMap = { 'Real Estate': HomeIcon, Vehicles: Car, Electronics: Smartphone };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.description}</p>
        </div>

        {/* Filters and Sort */}
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
              <span className="text-gray-600 text-sm">{category.ads.length} ads found</span>
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

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.ads.map((ad) => (
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