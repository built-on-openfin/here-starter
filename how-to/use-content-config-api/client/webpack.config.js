/* eslint-disable linebreak-style */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// A browser bundle cannot read `.env` at runtime, so the values are inlined
// here at build time. Re-run the build after changing them.
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
			'process.env.HERE_API_JWT': JSON.stringify(process.env.HERE_API_JWT ?? ''),
			'process.env.HERE_AUTH_ID': JSON.stringify(process.env.HERE_AUTH_ID ?? '')
		})
	],
	output: {
		filename: 'app.bundle.js',
		path: path.resolve(__dirname, '..', 'public', 'js')
	}
};
