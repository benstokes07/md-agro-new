import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // IMPORTANT
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Enable prefetching for faster navigation
  reactStrictMode: false, // Disable for better performance in production
  poweredByHeader: false, // Remove unnecessary header
  // Optimize static assets
  compress: true,
  // Cache optimization
  generateEtags: false,
  // Prefetch optimization
  images: {
    unoptimized: true, // IMPORTANT FOR EXPORT
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.airtable.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        pathname: "/**",
      }
    ]
  }
};

export default nextConfig;


