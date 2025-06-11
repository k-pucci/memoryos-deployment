// Check if we're building for static export
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
    unoptimized: true, // Required for static export
  },
  // Only enable output: 'export' for static builds
  ...(isStaticExport && { output: 'export' }),
  trailingSlash: true,
  basePath: '',
  distDir: '.next',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip API routes during static export
  exportPathMap: async function() {
    return isStaticExport ? {
      '/': { page: '/' },
      '/dashboard': { page: '/dashboard' },
      '/memory-stack': { page: '/memory-stack' },
      '/new-memory': { page: '/new-memory' },
      '/profile': { page: '/profile' },
      '/search': { page: '/search' },
      // Add other static pages here
    } : {};
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        stream: false,
      }
    }
    return config
  },
}

module.exports = nextConfig;
