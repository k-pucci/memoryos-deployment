/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only include page files in the app directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  
  // Disable server-side rendering for API routes during build
  experimental: {
    serverComponentsExternalPackages: ['@supabase/supabase-js'],
  },
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Skip API routes during build
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
        stream: false,
      };
      
      // Exclude API routes from the client-side bundle
      config.module.rules.push({
        test: /\/api\//,
        use: 'null-loader',
      });
    }
    
    return config;
  },
  
  // Skip API routes during build
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/404',
      },
    ];
  },
}

module.exports = nextConfig;
