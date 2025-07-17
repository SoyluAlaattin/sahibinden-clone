import { Client } from '@elastic/elasticsearch'

// Elasticsearch client'ını oluştur
export const client = new Client({
  node: 'http://localhost:9200'
})

// Elasticsearch bağlantısını test et
export async function testConnection() {
  try {
    const info = await client.info()
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
    const exists = await client.indices.exists({ index: indexName })
    if (!exists) {
      await client.indices.create({
        index: indexName,
        body: mapping
      })
      console.log(`${indexName} index'i oluşturuldu`)
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
    const result = await client.index({
      index: indexName,
      id: id,
      body: document
    })
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
    const result = await client.search({
      index: indexName,
      body: query
    })
    return result.hits
  } catch (error) {
    console.error('Arama hatası:', error)
    return null
  }
}

// Döküman sil
export async function deleteDocument(indexName: string, id: string) {
  try {
    await client.delete({
      index: indexName,
      id: id
    })
    console.log('Döküman silindi:', id)
    return true
  } catch (error) {
    console.error('Döküman silme hatası:', error)
    return false
  }
}

// Index'i sil
export async function deleteIndex(indexName: string) {
  try {
    await client.indices.delete({ index: indexName })
    console.log(`${indexName} index'i silindi`)
    return true
  } catch (error) {
    console.error('Index silme hatası:', error)
    return false
  }
} 