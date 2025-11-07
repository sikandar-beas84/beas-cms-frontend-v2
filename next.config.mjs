import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const { env } = require('./util/constants/common.js');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    domains: [env.BACKEND_DOMAIN],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: env.BACKEND_DOMAIN,
        port: '8000',
        pathname: '/assets/img/**',
      },
    ],
  },

  webpack: (config, { dev, isServer }) => {
    // Disable Webpack cache only in development mode
    if (dev) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
