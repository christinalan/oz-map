import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false, // Disables build activity indicator
    buildActivityPosition: 'top-right' // Hides the debug toolbar
  }
};

export default nextConfig;
