import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Clock } from 'lucide-react'

interface AdCardProps {
  id: string
  title: string
  price: string
  location: string
  image: string
  category: string
  postedDate: string
  isFavorite?: boolean
}

export default function AdCard({
  id,
  title,
  price,
  location,
  image,
  category,
  postedDate,
  isFavorite = false,
}: AdCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover"
        />
        <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50">
          <Heart 
            className={`h-5 w-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
          />
        </button>
        <div className="absolute bottom-2 left-2">
          <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <Link href={`/ad/${id}`} className="block">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600">
            {title}
          </h3>
        </Link>
        
        <div className="text-2xl font-bold text-blue-600 mb-3">
          {price}
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center text-gray-400 text-xs">
          <Clock className="h-3 w-3 mr-1" />
          <span>{postedDate}</span>
        </div>
      </div>
    </div>
  )
} 