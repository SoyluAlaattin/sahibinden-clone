"use client";
import { useState } from 'react'

// Client-side safe component

export default function TestElasticsearchPage() {
  const [status, setStatus] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  const initializeElasticsearch = async () => {
    setStatus('Initializing...')
    try {
      const response = await fetch('/api/elasticsearch/init', {
        method: 'POST'
      })
      const data = await response.json()
      
      if (response.ok) {
        setStatus(`Success! ${data.indexedCount} ads indexed`)
      } else {
        setStatus(`Error: ${data.error}`)
      }
    } catch (error) {
      setStatus(`Error: ${error}`)
    }
  }

  const searchAds = async () => {
    if (!searchQuery.trim()) return
    
    setStatus('Searching...')
    try {
      const response = await fetch(`/api/elasticsearch/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      
      if (response.ok) {
        setSearchResults(data.ads || [])
        setStatus(`Found ${data.total} results`)
      } else {
        setStatus(`Search error: ${data.error}`)
      }
    } catch (error) {
      setStatus(`Search error: ${error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Elasticsearch Test Page</h1>
        
        {/* Initialize Button */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Initialize Elasticsearch</h2>
          <button
            onClick={initializeElasticsearch}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Initialize with Sample Data
          </button>
          {status && (
            <p className="mt-2 text-sm text-gray-600">{status}</p>
          )}
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Ads</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Search ads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded"
            />
            <button
              onClick={searchAds}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Search
            </button>
          </div>
        </div>

        {/* Results */}
        {searchResults.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Search Results</h2>
            <div className="grid gap-4">
              {searchResults.map((ad: any) => (
                <div key={ad.id} className="border p-4 rounded">
                  <h3 className="font-semibold">{ad.title}</h3>
                  <p className="text-gray-600">{ad.description}</p>
                  <div className="flex gap-4 mt-2 text-sm">
                    <span className="text-green-600">₺{ad.price?.toLocaleString()}</span>
                    <span className="text-gray-500">{ad.location}</span>
                    <span className="text-gray-500">{ad.category}</span>
                    {ad.score && (
                      <span className="text-blue-600">Score: {ad.score.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 