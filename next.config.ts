import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337', // The port your Strapi backend is using
        pathname: '/uploads/**', // Adjust this if your image paths are different
      },
    ],
  },
};

export default nextConfig;
