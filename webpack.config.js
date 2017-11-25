var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var path = require("path");

module.exports = [
	{
		entry: ["babel-polyfill", path.resolve(__dirname, "src", "main.js")],
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: "bundle.js"
		},
		externals: {
			fs: "false",
			path: "false"
		},
		resolve: {
			modules: ["node_modules", path.resolve(__dirname, "src")]
		},
		devtool: "inline-source-map",
		target: "web",
		module: {
			rules: [
				// {
				// 	test: /\.js$/,
				// 	use: ["source-map-loader"],
				// 	enforce: "pre",
				// 	exclude: /node_modules/
				// },
				{
					loader: "babel-loader",
					query: {
						retainLines: true,
						cacheDirectory: true
					},
					test: /\.js/,
					exclude: /node_modules/
					// exclude: [/\.spec\.js/, /\.karma\.js/, /node_modules/]
				},
				{
					test: /\.txt$/,
					loader: "raw-loader"
				},
				{
					test: /\.html$/,
					loader: "html-loader"
				},
				{
					test: /\.png$/,
					loader: "img-element-loader!url-loader"
				},
				{
					test: /\.styl$/,
					loader: "style-loader!css-loader!stylus-loader"
				},
				{
					test: /\.(ttf|eot|svg|TTF)$/,
					loader: "file-loader"
				}
			]
		},
		plugins: [
			new CopyWebpackPlugin([
				{ from: path.resolve(__dirname, "html") } // to: output.path
			])
		]
	}
];
