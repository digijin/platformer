var path = require("path");
var webpackConf = require("./webpack.config.js");
delete webpackConf[0].entry;

// Karma configuration
module.exports = function(config) {
	if (config.reporters.indexOf("coverage-istanbul") > -1) {
		//inject instrumentation
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
			{ pattern: "src/**/*karma.js", watched: false },
			{ pattern: "src/worker/*worker.js", watched: true }
		],
		browser: { fs: false },
		exclude: [],
		preprocessors: {
			"src/worker/*worker.js": ["webpack", "sourcemap"],
			"src/**/!(*.spec|*.karma|worker).js": ["electron", "coverage"],
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
			fixWebpackSourcePaths: true,
			skipFilesWithNoCoverage: true,
			"report-config": {
				html: { subdir: "html" },
				lcov: { subdir: "lcov" }
			}
		},
		client: {
			//use iframe if not electron
			useIframe: config.browsers[0] !== "Electron"
		},
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		singleRun: false,
		browserNoActivityTimeout: 10 * 1000,
		browserDisconnectTimeout: 10 * 1000
	});
};
