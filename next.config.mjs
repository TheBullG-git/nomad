/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  // Ensure proper output
  output: 'standalone',
  // Experimental features
  experimental: {
    // Removed optimizeCss to avoid critters dependency issues
    scrollRestoration: true,
  },
}

export default nextConfig
