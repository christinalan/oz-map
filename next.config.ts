import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: {
    position: 'top-right' // Hides the debug toolbar
  }
};

export default nextConfig;
