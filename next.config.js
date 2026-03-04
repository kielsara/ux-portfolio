const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	experimental: {
		devtoolSegmentExplorer: false,
	},
}

module.exports = nextConfig
