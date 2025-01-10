import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true,
  },
  // Add your matcher to protect routes
  matcher: ['/account/:path*'],
};

export default nextConfig;
