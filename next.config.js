/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...config.externals, 'canvas', 'jsdom']

    return config
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://4ghosw.github.io/EcoMap_Web2/' : '',
  trailingSlash: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
