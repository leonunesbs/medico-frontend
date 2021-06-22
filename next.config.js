const removeImports = require('next-remove-imports')()
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withPWA = require('next-pwa')

const nextConfig = {
  future: {
    webpack5: true
  },
  images: {
    domains: ['github.com']
  }
}

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
          disable: process.env.NODE_ENV === 'development',
          register: true,
          cacheOnFrontEndNav: true
        }
      }
    ],
    [withImages],
    [removeImports]
  ],
  nextConfig
)
