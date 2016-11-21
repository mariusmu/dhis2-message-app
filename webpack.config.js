const path = require('path');
const srcPath = path.resolve(__dirname, "./app");
const test = require('./webpack-config/test.js');
const build = require('./webpack-config/build.js')
const env = process.argv.slice(2);

if(env[0] === "--test") {
    module.exports = test;
} else {
    module.exports = build;
}
