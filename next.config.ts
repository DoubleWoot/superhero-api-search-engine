import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/superhero/:path*",
        destination: `https://superheroapi.com/api/${process.env.NEXT_PUBLIC_SUPERHERO_API}/:path*`,
      },
    ];
  },
};

export default nextConfig;
