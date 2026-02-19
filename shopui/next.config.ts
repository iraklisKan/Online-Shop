import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the minimal Docker image (standalone mode)
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: (process.env.BACKEND_PORT === '443' ? 'https' : 'http') as 'http' | 'https',
        hostname: process.env.BACKEND_HOSTNAME ?? 'localhost',
        port: process.env.BACKEND_PORT === '443' ? '' : (process.env.BACKEND_PORT ?? '3001'),
        pathname: '/public/images/products/**',
      },
    ],
  },
};

export default nextConfig;
