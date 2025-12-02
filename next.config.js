/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thesimpsonsapi.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.thesimpsonsapi.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.glitch.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
      },
      {
        protocol: 'https',
        hostname: 'vignette.wikia.nocookie.net',
      }
    ],
  },
};

module.exports = nextConfig;
