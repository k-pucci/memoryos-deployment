const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
  distDir: '.next',
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
