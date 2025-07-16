import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Heart, Share2, Phone, Mail, MapPin, Clock, User, Shield } from 'lucide-react'
import Image from 'next/image'

interface AdPageProps {
  params: {
    id: string
  }
}

// Mock ad data
const getAdData = (id: string) => ({
  id,
  title: 'Modern 3-Bedroom Apartment in Istanbul',
  price: '₺2,500,000',
  location: 'Istanbul, Turkey',
  category: 'Real Estate',
  postedDate: '2 hours ago',
  description: `This beautiful 3-bedroom apartment is located in the heart of Istanbul, offering stunning views of the Bosphorus. The apartment features modern amenities, high-quality finishes, and a prime location close to shopping centers, restaurants, and public transportation.

Key Features:
• 3 bedrooms, 2 bathrooms
• 120 square meters
• Modern kitchen with appliances
• Balcony with city views
• Underground parking
• 24/7 security
• Close to metro station

The building is well-maintained and offers excellent facilities for families. Don't miss this opportunity to own a piece of Istanbul's most desirable real estate.`,
  images: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-6032e02f0f67?w=800&h=600&fit=crop',
  ],
  seller: {
    name: 'Ahmet Yılmaz',
    phone: '+90 532 123 45 67',
    email: 'ahmet.yilmaz@email.com',
    verified: true,
    memberSince: '2020',
    rating: 4.8,
    totalAds: 15,
  },
  details: {
    'Property Type': 'Apartment',
    'Bedrooms': '3',
    'Bathrooms': '2',
    'Size': '120 m²',
    'Floor': '5th',
    'Age': '2 years',
    'Parking': 'Yes',
    'Furnished': 'Semi-furnished',
  }
})

export default function AdPage({ params }: AdPageProps) {
  const ad = getAdData(params.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <span>Home</span>
          <span className="mx-2">›</span>
          <span>{ad.category}</span>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{ad.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="relative h-96 mb-4">
                <Image
                  src={ad.images[0]}
                  alt={ad.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {ad.images.slice(1).map((image, index) => (
                  <div key={index} className="relative h-20">
                    <Image
                      src={image}
                      alt={`${ad.title} ${index + 2}`}
                      fill
                      className="object-cover rounded cursor-pointer hover:opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Ad Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{ad.title}</h1>
                  <div className="text-2xl font-bold text-primary-600 mb-2">{ad.price}</div>
                  <div className="flex items-center text-gray-500 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{ad.location}</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-primary-600">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Description</h3>
                <p className="text-gray-700 whitespace-pre-line">{ad.description}</p>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(ad.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Seller */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
              
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="font-medium">{ad.seller.name}</span>
                  {ad.seller.verified && (
                    <Shield className="h-4 w-4 text-green-500 ml-1" />
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  Member since {ad.seller.memberSince} • {ad.seller.totalAds} ads
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{ad.seller.rating} rating</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 font-semibold flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call {ad.seller.phone}
                </button>
                <button className="w-full border border-primary-600 text-primary-600 py-3 rounded-lg hover:bg-primary-50 font-semibold flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2" />
                  Send Message
                </button>
              </div>
            </div>

            {/* Ad Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Ad Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span>{ad.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Posted:</span>
                  <span>{ad.postedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ad ID:</span>
                  <span>{ad.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
} 