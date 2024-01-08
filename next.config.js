/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's.yimg.com',
        port: '',
        pathname: '/uu/api/res/1.2/**',
      },
    ],
  },
};

module.exports = nextConfig;
