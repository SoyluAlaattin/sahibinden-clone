import { createIndex, bulkIndex } from '../lib/elasticsearch-http';

const ads = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Apartment in Istanbul',
    price: 2500000,
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    category: 'Real Estate',
    postedDate: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: '2020 BMW 3 Series - Excellent Condition',
    price: 850000,
    location: 'Ankara, Turkey',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    category: 'Vehicles',
    postedDate: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max - 256GB',
    price: 45000,
    location: 'Izmir, Turkey',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: 'Electronics',
    postedDate: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    title: 'Leather Sofa Set - Living Room Furniture',
    price: 12000,
    location: 'Bursa, Turkey',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    category: 'Furniture',
    postedDate: '2024-01-12T14:20:00Z',
  },
  {
    id: '5',
    title: 'Senior Software Developer Position',
    price: 25000,
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    category: 'Jobs',
    postedDate: '2024-01-11T11:45:00Z',
  },
  {
    id: '6',
    title: 'Professional Cleaning Services',
    price: 200,
    location: 'Antalya, Turkey',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    category: 'Services',
    postedDate: '2024-01-10T16:30:00Z',
  },
];

async function run() {
  try {
    // Create index if it doesn't exist
    const indexCreated = await createIndex('ads', {
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
    });

    if (!indexCreated) {
      console.error('Failed to create index');
      return;
    }

    // Bulk index ads
    const operations = ads.flatMap(ad => [
      { index: { _index: 'ads', _id: ad.id } },
      {
        ...ad,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]);

    const bulkResult = await bulkIndex(operations);
    if (bulkResult) {
      console.log('Ads indexed successfully!');
    } else {
      console.error('Failed to index ads');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

run().catch(console.error); 