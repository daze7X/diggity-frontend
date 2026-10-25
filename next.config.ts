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
      },
      {
        source: '/blog',
        destination: '/insights/blog',
        permanent: true,
      },
      {
        source: '/blog/:slug',
        destination: '/insights/blog/:slug',
        permanent: true,
      },
      {
        source: '/stories',
        destination: '/insights/success-stories',
        permanent: true,
      },
      {
        source: '/stories/:slug',
        destination: '/insights/success-stories/:slug',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
