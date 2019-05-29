/* eslint-disable @typescript-eslint/no-var-requires */
// const dotEnvResult = require('dotenv').config()
const withTypescript = require('@zeit/next-typescript')

const path = require('path')
const Dotenv = require('dotenv-webpack')

const nextConfig = {
  target: 'serverless',
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
    return config
  }
}

module.exports = withTypescript(nextConfig)
