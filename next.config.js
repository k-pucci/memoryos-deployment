const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  output: 'export',
  experimental: {
    outputFileTracing: false,
  },
}

module.exports = nextConfig;
