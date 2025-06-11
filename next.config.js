const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  output: 'export',
  trailingSlash: true,
  basePath: '',
  distDir: '.next',
  experimental: {
    outputFileTracing: false,
  },
}

module.exports = nextConfig;
