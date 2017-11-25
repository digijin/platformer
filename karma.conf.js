// Karma configuration
var path = require("path");
var webpackConf = require("./webpack.config.js");
delete webpackConf[0].entry;
//inject instrumentation

module.exports = function(config) {
	if (config.reporters.indexOf("coverage-istanbul") > -1) {
		webpackConf[0].module.rules.push({
			test: /\.js$|\.jsx$/,
			use: {
				loader: "istanbul-instrumenter-loader",
				options: { esModules: true }
			},
			enforce: "post",
			exclude: /node_modules|\.(spec|karma)\.js$/
		});
	}
	config.set({
		basePath: "",
		frameworks: ["jasmine"],
		files: [
			"node_modules/babel-polyfill/dist/polyfill.js",
			{ pattern: "src/**/*spec.js", watched: false },
			{ pattern: "src/**/*karma.js", watched: false }
		],
		browser: { fs: false },
		exclude: [],
		preprocessors: {
			"src/**/!(*.spec|*.karma).js": ["electron", "coverage"],
			"**/*karma.js": ["webpack", "sourcemap"],
			"**/*spec.js": ["webpack", "sourcemap"]
		},
		webpack: webpackConf[0],
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		// reporters: ['coverage', 'progress', 'kjhtml'], // 'nyan', 'dots', 'progress'
		reporters: ["coverage-istanbul"],

		specReporter: {
			suppressSkipped: true,
			showSpecTiming: true
		},
		coverageIstanbulReporter: {
			reports: ["html", "lcov"],
			dir: path.join(__dirname, "coverage"),
			// if using webpack and pre-loaders, work around webpack breaking the source path
			fixWebpackSourcePaths: true,
			// stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
			skipFilesWithNoCoverage: true,
			// Most reporters accept additional config options. You can pass these through the `report-config` option
			"report-config": {
				// all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
				html: {
					// outputs the report in ./coverage/html
					subdir: "html"
				},
				lcov: {
					subdir: "lcov"
				}
			}
		},
		client: {
			//use iframe if not electron
			useIframe: config.browsers[0] !== "Electron"
			// 	runInParent: true
		},

		// coverageReporter: {
		// 	reporters: [
		// 		{ type: "text" },
		// 		{
		// 			type: "lcov",
		// 			dir: "coverage",
		// 			subdir: "lcov"
		// 		}
		// 		// {
		// 		// 	type: "html",
		// 		// 	dir: "coverage/html"
		// 		// }
		// 	]
		// },
		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// browsers: ['Chrome'],
		// browsers: ['c:/Program Files (x86)/Google/Chrome/Application/Chrome.exe'],
		// browsers: ['Chrome', 'Firefox'],

		singleRun: false,

		browserNoActivityTimeout: 10 * 1000,
		browserDisconnectTimeout: 10 * 1000
	});
};
