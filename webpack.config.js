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
		// devServer: {
		// 	contentBase: path.join(__dirname, "dist") // boolean | string | array, static file location
		// },
		target: "web",
		module: {
			rules: [
				{
					loader: "babel-loader",
					test: /\.js/,
					exclude: /node_modules/
					// exclude: [/\.spec\.js/, /\.karma\.js/, /node_modules/]
				},
				{
					test: /\.txt$/,
					loader: "raw-loader"
				},
				// {
				// 	loader: "babel-loader",
				// 	test: /\.spec\.js/
				// },
				// {
				// 	loader: "babel-loader",
				// 	test: /\.karma\.js/
				// },
				{
					test: /\.html$/,
					loader: "html-loader"
				},
				{
					test: /\.png$/,
					loader: "img-element-loader!url-loader"
				},
				// {   test: /\.css$/,
				//     loader: "style-loader!css-loader"
				// },
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
			]),
			// new webpack.NoErrorsPlugin(),
			new StatsWriterPlugin({
				filename: "stats.json", // Default
				fields: null //all
			})
		]
	}
];

// var WriteFilePlugin = require("write-file-webpack-plugin");

// var dir_js = path.resolve(__dirname, "src");
// var dir_html = path.resolve(__dirname, "html");
// var dir_build = path.resolve(__dirname, "dist");
// var dir_spec = path.resolve(__dirname, "test");

// var argv = require("optimist").argv;

// var webpackConfig = {
// 	// target: 'electron',
// 	entry: ["babel-polyfill", path.resolve(dir_js, "main.js")],
// 	output: {
// 		path: dir_build,
// 		filename: "bundle.js"
// 	},
// 	externals: {
// 		fs: "false",
// 		path: "false"
// 	},
// 	devtool: "cheap-module-source-map",
// 	devServer: {
// 		//contentBase: dir_build,
// 		outputPath: dir_build
// 	},
// 	module: {
// 		loaders: [
// 			{
// 				loader: "babel-loader",
// 				test: /\.js/,
// 				exclude: [/\.spec\.js/, /node_modules/]
// 			},
// 			{
// 				loader: "babel-loader",
// 				test: /\.spec\.js/
// 			},
// 			{
// 				test: /\.html$/,
// 				loader: "html"
// 			},
// 			{
// 				test: /\.png$/,
// 				loader: "img-element!url"
// 			},
// 			// {   test: /\.css$/,
// 			//     loader: "style-loader!css-loader"
// 			// },
// 			{
// 				test: /\.styl$/,
// 				loader: "style-loader!css-loader!stylus-loader"
// 			},
// 			{
// 				test: /\.(ttf|eot|svg|TTF)$/,
// 				loader: "file-loader"
// 			}
// 		]
// 	},
// 	plugins: [
// 		new WriteFilePlugin(),
// 		// Simply copies the files over
// 		new CopyWebpackPlugin([
// 			{ from: dir_html } // to: output.path
// 		]),
// 		// Avoid publishing files when compilation fails
// 		new webpack.NoErrorsPlugin(),
// 		new StatsWriterPlugin({
// 			filename: "stats.json", // Default
// 			fields: null //all
// 		})
// 	],
// 	stats: {
// 		// Nice colored output
// 		colors: true
// 	},
// 	resolve: {
// 		root: path.join(process.cwd(), "src"),
// 		extensions: ["", ".js"]
// 	}
// };

// if (argv.electron) {
// 	webpackConfig.target = "electron";
// 	// webpackConfig.externals = null;
// 	delete webpackConfig.externals;
// }

// module.exports = webpackConfig;
