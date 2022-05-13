import { Configuration } from 'webpack';

const config: Configuration = {
	entry: {
		'bundle': ["./src/index.ts"]
	},
	output: {
		filename: 'bundle.js',
		library: {
			type: "umd",
		},
		globalObject: 'this'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
			}
		]
	},
	mode: "production",
	resolve: {
		extensions: ['.ts', '.js']
	}
};

export default config;