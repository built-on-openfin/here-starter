const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// A browser bundle cannot read `.env` at runtime, so the values are inlined
// here at build time. Re-run the build after changing them. Only non-secret
// values belong here — the bundle is readable by anyone who loads the page,
// which is why the UI signs in with OAuth rather than carrying a token.
const envPath = path.resolve(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
	process.loadEnvFile(envPath);
}

module.exports = {
	entry: './client/src/index.ts',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL ?? ''),
			'process.env.HERE_OAUTH_CLIENT_ID': JSON.stringify(process.env.HERE_OAUTH_CLIENT_ID ?? '')
		})
	],
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, '..', 'public', 'js')
	}
};
