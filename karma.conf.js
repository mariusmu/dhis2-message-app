const path = require('path');
const srcPath = path.resolve(__dirname, "./app");
const webpackConfig = require('./webpack-config/test.js');
module.exports = function (cnf) {
    cnf.set({
        frameworks: ['jasmine', 'browserify'],
        files: [
            //'./node_modules/babel-polyfill/*',
            'tests/**/*.spec.js'
        ],
        'basePath': '',
        preprocessors: {
            './app/app.jsx': ['webpack'],
            'tests/**/*.spec.js': ['webpack']
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
            'karma-browserify',
            require('karma-webpack')
        ],
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        },
        browsers: ['Chrome'],
        browserify: {
            debug: true,
            transform: ['babelify']
        },
        
        concurrency: Infinity
    });
}