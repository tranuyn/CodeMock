import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/authentication",
        destination: "/features/Authentication",
      },
      {
        source: "/Home",
        destination: "/features/Home",
      },
      {
        source: "/search",
        destination: "/features/SearchingInterviews",
      },
      {
        source: "/schedule",
        destination: "/features/Schedule",
      },
      {
        source: "/settings",
        destination: "/features/Settings",
      },
      {
        source: "/Interview/create-interview",
        destination: "/features/Interview/create-interview",
      },
    ];
  },
};

export default nextConfig;
