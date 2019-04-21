const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const { BUNDLE_ANALYZE } = process.env

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

module.exports = withBundleAnalyzer(nextConfig)
