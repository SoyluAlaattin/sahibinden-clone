// HTTP-based Elasticsearch client (no external dependencies)

const ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || 'http://localhost:9200'

// Elasticsearch bağlantısını test et
export async function testConnection() {
  try {
    const response = await fetch(`${ELASTICSEARCH_URL}`)
    const info = await response.json()
    console.log('Elasticsearch bağlantısı başarılı:', info)
    return true
  } catch (error) {
    console.error('Elasticsearch bağlantı hatası:', error)
    return false
  }
}

// Index oluştur
export async function createIndex(indexName: string, mapping?: any) {
  try {
    const existsResponse = await fetch(`${ELASTICSEARCH_URL}/${indexName}`)
    if (existsResponse.status === 404) {
      const response = await fetch(`${ELASTICSEARCH_URL}/${indexName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mapping)
      })
      
      if (response.ok) {
        console.log(`${indexName} index'i oluşturuldu`)
        return true
      } else {
        console.error('Index oluşturma hatası:', await response.text())
        return false
      }
    }
    return true
  } catch (error) {
    console.error('Index oluşturma hatası:', error)
    return false
  }
}

// Döküman ekle/güncelle
export async function indexDocument(indexName: string, document: any, id?: string) {
  try {
    const url = id 
      ? `${ELASTICSEARCH_URL}/${indexName}/_doc/${id}`
      : `${ELASTICSEARCH_URL}/${indexName}/_doc`
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(document)
    })
    
    const result = await response.json()
    console.log('Döküman indekslendi:', result._id)
    return result._id
  } catch (error) {
    console.error('Döküman indeksleme hatası:', error)
    return null
  }
}

// Arama yap
export async function searchDocuments(indexName: string, query: any) {
  try {
    const response = await fetch(`${ELASTICSEARCH_URL}/${indexName}/_search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(query)
    })
    
    const result = await response.json()
    return result.hits
  } catch (error) {
    console.error('Arama hatası:', error)
    return null
  }
}

// Toplu indeksleme
export async function bulkIndex(operations: any[]) {
  try {
    const body = operations.map(op => JSON.stringify(op)).join('\n') + '\n'
    
    const response = await fetch(`${ELASTICSEARCH_URL}/_bulk`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-ndjson',
      },
      body
    })
    
    const result = await response.json()
    console.log('Toplu indeksleme tamamlandı')
    return result
  } catch (error) {
    console.error('Toplu indeksleme hatası:', error)
    return null
  }
} 