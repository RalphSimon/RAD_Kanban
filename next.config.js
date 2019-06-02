/* eslint-disable @typescript-eslint/no-var-requires */
// const dotEnvResult = require('dotenv').config()
const withTypescript = require('@zeit/next-typescript')

const path = require('path')
const Dotenv = require('dotenv-webpack')

const withAssetRelocator = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      const { isServer } = options

      if (isServer) {
        config.node = Object.assign({}, config.node, {
          __dirname: false,
          __filename: false
        })

        config.module.rules.unshift({
          test: /\.(m?js|node)$/,
          parser: { amd: false },
          use: {
            loader: '@zeit/webpack-asset-relocator-loader',
            options: {
              outputAssetBase: 'assets',
              existingAssetNames: [],
              wrapperCompatibility: true,
              escapeNonAnalyzableRequires: true
            }
          }
        })
      }

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }
      return config
    }
  })
}

const nextConfig = {
  target: 'serverless',
  // env: {
  //   apiKey: 'AIzaSyBObEFDb0Vnvb4Cj3C9b7SbcFmzzAVAIrg',
  //   authDomain: 'kanban-b819c.firebaseapp.com',
  //   databaseURL: 'https://kanban-b819c.firebaseio.com',
  //   projectId: 'kanban-b819c',
  //   storageBucket: 'kanban-b819c.appspot.com',
  //   messagingSenderId: '469814446112',
  //   appId: '1:469814446112:web:a63771304e30327b'
  // }
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

module.exports = withTypescript(withAssetRelocator(nextConfig))
