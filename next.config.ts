import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.remixai.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets.chromastudio.ai',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.maxstudio.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
