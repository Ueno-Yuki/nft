/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    }
    return config;
  }
}

module.exports = nextConfig
