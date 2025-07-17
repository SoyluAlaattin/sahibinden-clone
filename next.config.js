/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['@elastic/elasticsearch', '@elastic/transport', 'undici']
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side'da Elasticsearch paketlerini ignore et
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@elastic/elasticsearch': false,
        '@elastic/transport': false,
        'undici': false
      }
    }
    
    // Server-side'da da bazı paketleri external olarak işaretle
    if (isServer) {
      config.externals = config.externals || []
      config.externals.push('@elastic/elasticsearch', '@elastic/transport', 'undici')
    }
    
    return config
  }
}

module.exports = nextConfig 