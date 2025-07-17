import { NextResponse } from 'next/server'
import { initializeAdsIndex, bulkIndexAds } from '@/lib/ads-elasticsearch'

// Mock ilan verileri
const mockAds = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Apartment in Istanbul',
    description: 'Beautiful modern apartment with sea view in Istanbul',
    price: 2500000,
    location: 'Istanbul, Turkey',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    postedDate: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    title: 'Luxury Villa with Sea View',
    description: 'Stunning luxury villa with panoramic sea views',
    price: 5200000,
    location: 'Antalya, Turkey',
    category: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
    postedDate: '2024-01-14T15:30:00Z'
  },
  {
    id: '3',
    title: '2020 BMW 3 Series - Excellent Condition',
    description: 'Well-maintained BMW 3 Series with low mileage',
    price: 850000,
    location: 'Ankara, Turkey',
    category: 'Vehicles',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    postedDate: '2024-01-13T09:15:00Z'
  },
  {
    id: '4',
    title: 'iPhone 15 Pro Max - 256GB',
    description: 'Brand new iPhone 15 Pro Max, sealed box',
    price: 45000,
    location: 'Izmir, Turkey',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    postedDate: '2024-01-12T14:20:00Z'
  },
  {
    id: '5',
    title: 'MacBook Pro M2 - 14 inch',
    description: 'Powerful MacBook Pro with M2 chip, perfect for work',
    price: 65000,
    location: 'Istanbul, Turkey',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    postedDate: '2024-01-11T11:45:00Z'
  }
]

export async function POST() {
  try {
    // Index'i oluştur
    const indexCreated = await initializeAdsIndex()
    if (!indexCreated) {
      return NextResponse.json(
        { error: 'Index oluşturulamadı' },
        { status: 500 }
      )
    }

    // Mock verileri indeksle
    const bulkResult = await bulkIndexAds(mockAds)
    if (!bulkResult) {
      return NextResponse.json(
        { error: 'Veriler indekslenemedi' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Elasticsearch başarıyla başlatıldı',
      indexedCount: mockAds.length,
      result: bulkResult
    })

  } catch (error) {
    console.error('Elasticsearch başlatma hatası:', error)
    return NextResponse.json(
      { error: 'Elasticsearch başlatılamadı' },
      { status: 500 }
    )
  }
} 