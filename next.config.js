/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: "/pkmn",
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
        source: "/type-chart",
        destination: "/type-chart/current",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
