/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['v0.blob.com'],
    unoptimized: true,
  },
  // Add environment variables to be available at build time
  env: {
    NEXT_PHASE: process.env.NEXT_PHASE || '',
  },
  // Ensure proper output
  output: 'standalone',
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
}

export default nextConfig
