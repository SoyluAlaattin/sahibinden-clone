import { NextRequest, NextResponse } from 'next/server'
import { searchDocuments } from '@/lib/elasticsearch-http'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const category = searchParams.get('category')
    const location = searchParams.get('location')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const type = searchParams.get('type') || 'general'

    let searchQuery: any

    // Arama tipine göre farklı query'ler oluştur
    switch (type) {
      case 'category':
        if (!category) {
          return NextResponse.json(
            { error: 'Kategori parametresi gerekli' },
            { status: 400 }
          )
        }
        searchQuery = {
          query: {
            bool: {
              must: [
                { term: { category: category } }
              ]
            }
          },
          sort: [
            { createdAt: { order: 'desc' } }
          ],
          size: 50
        }
        
        if (query) {
          searchQuery.query.bool.must.push({
            multi_match: {
              query: query,
              fields: ['title^2', 'description', 'location'],
              fuzziness: 'AUTO'
            }
          })
        }
        break

      case 'price-range':
        if (!minPrice || !maxPrice) {
          return NextResponse.json(
            { error: 'Min ve max fiyat parametreleri gerekli' },
            { status: 400 }
          )
        }
        searchQuery = {
          query: {
            range: {
              price: {
                gte: Number(minPrice),
                lte: Number(maxPrice)
              }
            }
          },
          sort: [
            { price: { order: 'asc' } }
          ],
          size: 50
        }
        break

      case 'location':
        if (!location) {
          return NextResponse.json(
            { error: 'Konum parametresi gerekli' },
            { status: 400 }
          )
        }
        searchQuery = {
          query: {
            match: {
              location: location
            }
          },
          sort: [
            { createdAt: { order: 'desc' } }
          ],
          size: 50
        }
        break

      case 'all':
        searchQuery = {
          query: {
            match_all: {}
          },
          sort: [
            { createdAt: { order: 'desc' } }
          ],
          size: 100
        }
        break

      default:
        // Genel arama
        searchQuery = {
          query: {
            bool: {
              must: [
                {
                  multi_match: {
                    query: query,
                    fields: ['title^2', 'description', 'location'],
                    fuzziness: 'AUTO'
                  }
                }
              ],
              filter: []
            }
          },
          sort: [
            { _score: { order: 'desc' } },
            { createdAt: { order: 'desc' } }
          ],
          size: 20
        }

        // Filtreleri ekle
        if (category) {
          searchQuery.query.bool.filter.push({
            term: { category: category }
          })
        }
        
        if (location) {
          searchQuery.query.bool.filter.push({
            term: { 'location.keyword': location }
          })
        }
        
        if (minPrice || maxPrice) {
          const rangeFilter: any = { price: {} }
          if (minPrice) rangeFilter.price.gte = Number(minPrice)
          if (maxPrice) rangeFilter.price.lte = Number(maxPrice)
          searchQuery.query.bool.filter.push({ range: rangeFilter })
        }
        break
    }

    const result = await searchDocuments('ads', searchQuery)

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