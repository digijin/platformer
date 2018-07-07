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
		devServer: {
			contentBase: path.resolve("dist")
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
					test: /\.glsl$/,
					loader: "raw-loader"
				},
				{
					test: /\.html$/,
					loader: "html-loader"
				},
				{
					test: /\.svg$/,
					loader: "raw-loader"
					// loader: "babel-loader!url-loader"
				},
				{
					test: /\.(png|jpg)$/,
					loader: "img-element-loader!url-loader"
				},
				{
					test: /\.styl$/,
					loader: "style-loader!css-loader!stylus-loader"
				},
				{
					test: /\.(ttf|otf|eot|TTF)$/,
					loader: "file-loader"
				},
				{
					test: /sprites\.(png|json)/,
					loader: "file-loader",
					options: {
						name: "assets/[name].[ext]"
					}
				}
			]
		},
		plugins: [
			new CopyWebpackPlugin([
				{ from: path.resolve(__dirname, "html") }, // to: output.path
				{ from: path.resolve(__dirname, "assets"), to: "assets" }
			]),
			new StatsWriterPlugin({
				// transform: function(data) {
				// 	console.log(
				// 		"TODO HERE DATA",
				// 		JSON.stringify(data, null, 2)
				// 	);
				// 	return {
				// 		main: data.assetsByChunkName.main[0],
				// 		css: data.assetsByChunkName.main[1]
				// 	};
				// }
			})
		]
	}
];
