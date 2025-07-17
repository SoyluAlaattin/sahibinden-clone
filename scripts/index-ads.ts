import { elasticClient } from '../lib/elasticsearch';

const ads = [
  {
    id: '1',
    title: 'Modern 3-Bedroom Apartment in Istanbul',
    price: '₺2,500,000',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
    category: 'Real Estate',
    postedDate: '2 hours ago',
  },
  {
    id: '2',
    title: '2020 BMW 3 Series - Excellent Condition',
    price: '₺850,000',
    location: 'Ankara, Turkey',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
    category: 'Vehicles',
    postedDate: '1 day ago',
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max - 256GB',
    price: '₺45,000',
    location: 'Izmir, Turkey',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop',
    category: 'Electronics',
    postedDate: '3 hours ago',
  },
  {
    id: '4',
    title: 'Leather Sofa Set - Living Room Furniture',
    price: '₺12,000',
    location: 'Bursa, Turkey',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop',
    category: 'Furniture',
    postedDate: '5 hours ago',
  },
  {
    id: '5',
    title: 'Senior Software Developer Position',
    price: '₺25,000/month',
    location: 'Istanbul, Turkey',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
    category: 'Jobs',
    postedDate: '1 day ago',
  },
  {
    id: '6',
    title: 'Professional Cleaning Services',
    price: '₺200/hour',
    location: 'Antalya, Turkey',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop',
    category: 'Services',
    postedDate: '4 hours ago',
  },
];

async function run() {
  // Create index if it doesn't exist
  const index = 'ads';
  const exists = await elasticClient.indices.exists({ index });
  if (!exists) {
    await elasticClient.indices.create({ index });
  }

  // Bulk index ads
  const body = ads.flatMap((doc) => [{ index: { _index: index, _id: doc.id } }, doc]);
  const bulkResponse = await elasticClient.bulk({ refresh: true, body });
  if (bulkResponse.errors) {
    console.error('Bulk indexing errors:', bulkResponse.errors);
  } else {
    console.log('Ads indexed successfully!');
  }
}

run().catch(console.error); 