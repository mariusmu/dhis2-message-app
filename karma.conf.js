module.exports = function (cnf) {
    cnf.set({
        frameworks: ['jasmine', 'browserify'],
        files: [
            //'./node_modules/babel-polyfill/*',
            'tests/**/*.spec.js'
        ],
        'basePath': '',
        preprocessors: {
            'tests/**/*.spec.js': ['browserify']
        },
        babelPreprocessor: {
            options: {
                "presets": ["es2015"]
            }
        },
        webpack: {

        },
        proxies: {
            'app': 'base/app'
        },
        reporters: ['progress'],
        port: '9876',
        colors: true,
        plugins: [
            'karma-babel-preprocessor',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-browserify'
        ],
        browsers: ['Chrome'],
        browserify: {
            debug: true,
            transform: [ 'babelify' ]
        },
        concurrency: Infinity
    });
}