var bc = 'app/bower_components/';

module.exports = function(config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['qunit'],

        // list of files / patterns to load in the browser
        files: [
            // bower_components
            bc + 'jquery/jquery.js',
            bc + 'handlebars/handlebars.runtime.js',
            bc + 'ember/ember.js',
            bc + 'ember-data/ember-data.js',

            // compiled templates and combined app
            '.tmp/scripts/compiled-templates.js',
            '.tmp/scripts/combined-scripts.js',

            // styles
            '.tmp/styles/style.css',

            // include TestEnv
            'test/TestEnv.js',
            // including the tests
            'test/Integration/**/*.js',
            'test/Unit/**/*.js'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            '.tmp/scripts/*.js': ['coverage']
        },

        plugins: [
            'karma-qunit',
            'karma-ember-preprocessor',
            'karma-chrome-launcher',
            'karma-phantomjs-launcher',
            'karma-coverage'
        ],
        coverageReporter: {
            reporters:[
                {type: 'html', dir:'coverage/'},
                {type: 'text'}
            ]
        },

        // list of files to exclude
        exclude: [
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['dots', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000
    });
};