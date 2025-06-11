/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true, // Required for static export
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only include page files in the app directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Skip API routes during build
  experimental: {
    // This will prevent API routes from being processed during build
    // They'll be handled by Vercel's serverless functions
    serverActions: true,
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        stream: false,
      };
      
      // Exclude API routes from the client-side bundle
      config.module.rules.push({
        test: /\/api\/\.*(js|mjs|jsx|ts|tsx)$/,
        use: 'null-loader',
      });
    }
    
    return config;
  },
}

module.exports = nextConfig;
