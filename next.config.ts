import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  output: 'standalone',
  experimental: {
    outputStandalone: true,
  },
};

export default nextConfig;
