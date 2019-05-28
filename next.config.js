/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const { BUNDLE_ANALYZE } = process.env
const withTypescript = require('@zeit/next-typescript')
require('dotenv').config()

const nextConfig = {
  target: 'serverless',
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
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }, {})

    config.plugins.push(new webpack.DefinePlugin(env))

    return config
  }
}

module.exports = withTypescript(withBundleAnalyzer(nextConfig))
