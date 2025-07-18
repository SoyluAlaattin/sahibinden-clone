# Sahibinden Clone

A modern classified ads platform built with Next.js, featuring Elasticsearch integration for powerful search capabilities.

## Features

- **Advanced Search**: Full-text search with Elasticsearch
- **Category-based browsing**: Real estate, vehicles, electronics
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean and intuitive interface
- **Real-time filtering**: Price, location, and date filters

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Search**: Elasticsearch (HTTP client)
- **Deployment**: Vercel

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start Elasticsearch (Docker): `docker run -d --name elasticsearch -p 9200:9200 -e "discovery.type=single-node" -e "xpack.security.enabled=false" docker.elastic.co/elasticsearch/elasticsearch:8.11.0`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

The project is configured for Vercel deployment with Elasticsearch integration using HTTP client instead of the official Elasticsearch library for better compatibility.

## Latest Update

- Fixed Elasticsearch integration for Vercel deployment
- Removed problematic dependencies
- Updated to use HTTP-based Elasticsearch client
- Manual deployment trigger - 2024 
