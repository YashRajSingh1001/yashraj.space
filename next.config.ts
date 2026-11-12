import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/75-before-30", destination: "/100-before-30", permanent: true }];
  },
};

export default nextConfig;
