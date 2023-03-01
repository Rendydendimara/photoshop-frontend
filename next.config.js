/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  },
  images: {
    domains: ['drive.google.com', 'localhost', '65.20.78.104', 'backend.thetruesight.com'],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
