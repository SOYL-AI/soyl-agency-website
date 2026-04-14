/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["three"],
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.soyl.in" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
}

module.exports = nextConfig
