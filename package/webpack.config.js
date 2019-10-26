var path = require('path');

module.exports = {
	mode: 'production',
	// entry: './src/calendar/Calendar.jsx',
	entry: './src/App.jsx',
	output: {
		path: path.resolve('src'),
		filename: 'index.js',
		libraryTarget: 'commonjs2',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules)/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	/*resolve: {
		alias: {
			react: path.resolve('./node_modules/react'),
		},
    },*/
	externals: {
		react: 'React',
		'react-dom': 'react-dom',
	},
};
