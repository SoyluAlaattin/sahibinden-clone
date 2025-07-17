import { client, createIndex, indexDocument, searchDocuments } from './elasticsearch'

// İlanlar için index adı
const ADS_INDEX = 'ads'

// İlan mapping'i (şema)
const adsMapping = {
  mappings: {
    properties: {
      id: { type: 'keyword' },
      title: { 
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: { type: 'keyword' }
        }
      },
      description: { 
        type: 'text',
        analyzer: 'standard'
      },
      price: { 
        type: 'float',
        fields: {
          keyword: { type: 'keyword' }
        }
      },
      location: { 
        type: 'text',
        analyzer: 'standard',
        fields: {
          keyword: { type: 'keyword' }
        }
      },
      category: { 
        type: 'keyword'
      },
      image: { type: 'keyword' },
      postedDate: { type: 'date' },
      createdAt: { type: 'date' },
      updatedAt: { type: 'date' }
    }
  }
}

// İlanlar index'ini oluştur
export async function initializeAdsIndex() {
  return await createIndex(ADS_INDEX, adsMapping)
}

// İlan ekle/güncelle
export async function indexAd(ad: any) {
  const document = {
    ...ad,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  return await indexDocument(ADS_INDEX, document, ad.id)
}

// İlanları toplu olarak ekle
export async function bulkIndexAds(ads: any[]) {
  try {
    const operations = ads.flatMap(ad => [
      { index: { _index: ADS_INDEX, _id: ad.id } },
      {
        ...ad,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ])

    const result = await client.bulk({ body: operations })
    console.log(`${ads.length} ilan toplu olarak indekslendi`)
    return result
  } catch (error) {
    console.error('Toplu indeksleme hatası:', error)
    return null
  }
}

// İlan ara
export async function searchAds(query: string, filters?: any) {
  const searchQuery = {
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
  if (filters) {
    if (filters.category) {
      searchQuery.query.bool.filter.push({
        term: { category: filters.category }
      })
    }
    
    if (filters.location) {
      searchQuery.query.bool.filter.push({
        term: { 'location.keyword': filters.location }
      })
    }
    
    if (filters.minPrice || filters.maxPrice) {
      const rangeFilter: any = { price: {} }
      if (filters.minPrice) rangeFilter.price.gte = filters.minPrice
      if (filters.maxPrice) rangeFilter.price.lte = filters.maxPrice
      searchQuery.query.bool.filter.push({ range: rangeFilter })
    }
  }

  return await searchDocuments(ADS_INDEX, searchQuery)
}

// Kategoriye göre ara
export async function searchAdsByCategory(category: string, query?: string) {
  const searchQuery = {
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

  return await searchDocuments(ADS_INDEX, searchQuery)
}

// Fiyat aralığına göre ara
export async function searchAdsByPriceRange(minPrice: number, maxPrice: number) {
  const searchQuery = {
    query: {
      range: {
        price: {
          gte: minPrice,
          lte: maxPrice
        }
      }
    },
    sort: [
      { price: { order: 'asc' } }
    ],
    size: 50
  }

  return await searchDocuments(ADS_INDEX, searchQuery)
}

// Konuma göre ara
export async function searchAdsByLocation(location: string) {
  const searchQuery = {
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

  return await searchDocuments(ADS_INDEX, searchQuery)
}

// Tüm ilanları getir
export async function getAllAds() {
  const searchQuery = {
    query: {
      match_all: {}
    },
    sort: [
      { createdAt: { order: 'desc' } }
    ],
    size: 100
  }

  return await searchDocuments(ADS_INDEX, searchQuery)
} 