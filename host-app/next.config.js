const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	webpack(config, { isServer }) {
		if (!isServer) {
            config.plugins.push(
                new NextFederationPlugin({
                    name: 'host',
                    remotes: {
                        remote: 'remote@http://localhost:3001/remoteEntry.js',
                    },
                    filename: 'static/chunks/remote.js',
                }),
            );
        }

        return config;
	}
}

module.exports = nextConfig
