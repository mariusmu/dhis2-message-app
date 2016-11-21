const base = require('./base.js');
const webpack = require('webpack');
//process.exit();
base.plugins = [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ];
base.externals = {
        "react" : "React",
        "react-dom" : "ReactDom"
};

module.exports = base;