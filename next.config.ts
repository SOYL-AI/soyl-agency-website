import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.soyl.in" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
}

export default nextConfig
