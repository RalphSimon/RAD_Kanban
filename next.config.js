/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack')
const withTypescript = require('@zeit/next-typescript')
require('dotenv').config()

const nextConfig = {
  target: 'serverless',
  webpack(config) {
    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr])
      return acc
    }, {})

    config.plugins.push(new webpack.DefinePlugin(env))

    return config
  }
}

module.exports = withTypescript(nextConfig)
