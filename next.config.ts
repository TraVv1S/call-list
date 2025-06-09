import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lk.skilla.ru",
      },
    ],
  },
};

export default nextConfig;
