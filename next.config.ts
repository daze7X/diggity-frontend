import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/solutions/website-development',
        destination: '/solutions/technology/website-development',
        permanent: true,
      },
      {
        source: '/solutions/technology-solutions',
        destination: '/solutions/technology',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
