import { NextRequest, NextResponse } from 'next/server'
import { searchAds, searchAdsByCategory, searchAdsByPriceRange, searchAdsByLocation, getAllAds } from '@/lib/ads-elasticsearch'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const type = searchParams.get('type') || 'general'

    let result

    // Arama tipine göre farklı fonksiyonlar kullan
    switch (type) {
      case 'category':
        if (!category) {
          return NextResponse.json(
            { error: 'Kategori parametresi gerekli' },
            { status: 400 }
          )
        }
        result = await searchAdsByCategory(category, query)
        break

      case 'price-range':
        if (!minPrice || !maxPrice) {
          return NextResponse.json(
            { error: 'Min ve max fiyat parametreleri gerekli' },
            { status: 400 }
          )
        }
        result = await searchAdsByPriceRange(Number(minPrice), Number(maxPrice))
        break

      case 'location':
        if (!location) {
          return NextResponse.json(
            { error: 'Konum parametresi gerekli' },
            { status: 400 }
          )
        }
        result = await searchAdsByLocation(location)
        break

      case 'all':
        result = await getAllAds()
        break

      default:
        // Genel arama
        const filters: any = {}
        if (category) filters.category = category
        if (location) filters.location = location
        if (minPrice) filters.minPrice = Number(minPrice)
        if (maxPrice) filters.maxPrice = Number(maxPrice)

        result = await searchAds(query, Object.keys(filters).length > 0 ? filters : undefined)
        break
    }

    if (!result) {
      return NextResponse.json(
        { error: 'Arama yapılamadı' },
        { status: 500 }
      )
    }

    // Sonuçları düzenle
    const hits = result.hits || []
    const total = result.total?.value || 0

    const ads = hits.map((hit: any) => ({
      id: hit._id,
      score: hit._score,
      ...hit._source
    }))

    return NextResponse.json({
      query: query,
      total: total,
      ads: ads,
      filters: {
        category,
        location,
        minPrice,
        maxPrice
      }
    })

  } catch (error) {
    console.error('Arama hatası:', error)
    return NextResponse.json(
      { error: 'Arama yapılamadı' },
      { status: 500 }
    )
  }
} 