/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only include page files in the pages directory
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  
  // Completely ignore API routes during build
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        stream: false,
      };
    }
    
    // Exclude API routes from the client-side bundle
    if (!isServer) {
      config.module.rules.push({
        test: /\/api\/.*\.(ts|js|tsx|jsx)$/,
        use: 'null-loader',
      });
    }
    
    return config;
  },
  
  // Skip API routes during build
  async exportPathMap() {
    return {
      '/': { page: '/' },
      '/dashboard': { page: '/dashboard' },
      // Add other static pages here
    };
  },
}

module.exports = nextConfig;
