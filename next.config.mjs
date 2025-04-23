/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // Important for Cloudflare Pages
    domains: ['v0.blob.com'], // Add any image domains you're using
  },
}

export default nextConfig