// Karma configuration

var webpackConf = require('./webpack.config.js');
delete webpackConf.entry;
// webpackConf.module.loaders[0].loader = 'isparta'; //instrument
webpackConf.plugins = [];

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',
    frameworks: ['jasmine'],//

    // list of files / patterns to load in the browser
    files: [
    // {pattern: 'spec/fixtures/*.html', watched: true, included: false, served: true},
      // 'spec/fixtures/*.html',
      // 'node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/*.karma.js',
    ],

    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        '**/*karma.js*': ['webpack', 'sourcemap']
    },

    webpack: webpackConf,

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    // reporters: ['coverage', 'progress', 'kjhtml'], // 'nyan',
    reporters: ['spec', 'coverage'],

    specReporter: {
      suppressSkipped: true,
      showSpecTiming: true
    },

    coverageReporter: {
      reporters:[
        // {type: 'text'},
        {
          type: 'lcov',
          dir: 'coverage/functional/'
        },
        {
          type : 'html',
          dir : 'coverage/html/'
        }
      ]
    },
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

    browserNoActivityTimeout: 10*1000,
    browserDisconnectTimeout: 10*1000,

  });
};
