/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const { BUNDLE_ANALYZE } = process.env
const withTypescript = require('@zeit/next-typescript')

const nextConfig = {
  analyzeServer: ['server', 'both'].includes(BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html'
    }
  },
  webpack(config) {
    return config
  }
}

module.exports = withTypescript(withBundleAnalyzer(nextConfig))
