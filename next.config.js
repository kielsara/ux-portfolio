const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	experimental: {
		devtoolSegmentExplorer: false,
	},
	// No legacy redirects configured; `/case-study` URLs are retired.
}

module.exports = nextConfig
