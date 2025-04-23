/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's no longer recognized in Next.js 15
  // swcMinify: true,
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
  // Update experimental features - remove optimizeCss
  experimental: {
    // optimizeCss: true, // Remove this line
    scrollRestoration: true,
  },
}

export default nextConfig