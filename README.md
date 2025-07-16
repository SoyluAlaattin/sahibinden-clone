# Sahibinden Clone

A modern, responsive classified ads platform built with Next.js, TypeScript, and Tailwind CSS. This project is a clone of Sahibinden.com, Turkey's leading classified ads website.

## Features

- 🏠 **Real Estate Listings** - Browse properties, apartments, and commercial spaces
- 🚗 **Vehicle Marketplace** - Cars, motorcycles, and other vehicles
- 📱 **Electronics Store** - Latest gadgets and devices
- 🪑 **Furniture & Home** - Home decor and furniture items
- 💼 **Job Board** - Employment opportunities
- 🔧 **Services** - Professional services and trades
- 🔍 **Advanced Search** - Find exactly what you're looking for
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Next.js for optimal speed

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Headless UI
- **Deployment**: Vercel (ready)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd sahibinden-clone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
sahibinden-clone/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── ad/[id]/           # Individual ad pages
│   └── category/[slug]/   # Category pages
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── AdCard.tsx         # Ad listing card
│   └── CategoryCard.tsx   # Category card
├── public/               # Static assets
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment on Vercel

This project is optimized for Vercel deployment. Follow these steps:

1. **Push to GitHub**: Make sure your code is in a GitHub repository

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with your GitHub account
   - Click "New Project"
   - Import your repository

3. **Deploy Settings**:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

4. **Environment Variables** (if needed):
   - Add any environment variables in the Vercel dashboard

5. **Deploy**: Click "Deploy" and your site will be live!

## Customization

### Colors
The color scheme can be customized in `tailwind.config.js`:
```javascript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... other shades
    900: '#0c4a6e',
  }
}
```

### Categories
Add or modify categories in the homepage and category pages by updating the mock data arrays.

### Images
Replace the Unsplash image URLs with your own images or integrate with an image hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for educational purposes. The original Sahibinden.com design and branding belong to their respective owners.

## Support

If you have any questions or need help with deployment, feel free to open an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
