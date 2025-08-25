const path = require('path');

module.exports = {
	entry: './client/src/provider.ts',
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
		extensions: ['.tsx', '.ts', '.js'],
		fallback: {
			crypto: require.resolve('crypto-browserify'),
			vm: require.resolve('vm-browserify'),
			stream: require.resolve('stream-browserify'),
			util: require.resolve('util/')
		}
	},
	output: {
		filename: 'provider.bundle.js',
		path: path.resolve(__dirname, '..', 'public', 'js')
	}
};
