const removeImports = require('next-remove-imports')
const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
  future: {
    webpack5: true
  },
  images: {
    domains: ['github.com']
  }
}

module.exports = withPlugins([[withImages]], nextConfig)

module.exports = removeImports({})
