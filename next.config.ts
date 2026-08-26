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
        source: '/solutions/ai-emerging-technology',
        destination: '/solutions/ai-emerging-technology',
        permanent: true,
      },
      {
        source: '/solutions/creative-brand-experience',
        destination: '/solutions/creative-brand-experience',
        permanent: true,
      },
      {
        source: '/solutions/growth-marketing',
        destination: '/solutions/growth-marketing',
        permanent: true,
      },
      {
        source: '/solutions/cloud-cyber-security',
        destination: '/solutions/cloud-cyber-security',
        permanent: true,
      },
      {
        source: '/solutions/consulting',
        destination: '/solutions/consulting',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
