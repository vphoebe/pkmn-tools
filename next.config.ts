import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/PokeAPI/sprites/master/sprites/pokemon/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/matchups/pikachu",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
