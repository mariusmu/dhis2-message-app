const path = require('path');
const srcPath = path.resolve(__dirname, "./app");
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/app",
    entry: "./app.jsx",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/assets"

    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel",
               // exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: "style!css!less",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader",

            },
            {
                test: /\.json$/,
                loader: "json-loader",
            }

        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
        }),

        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    externals: {
        "react" : "React",
        "react-dom" : "ReactDom"
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "components": srcPath + "/Components/",
            "constants": srcPath + "/Constants/",
            "services": srcPath + "/Services/",
            "style": srcPath + "/Style/",
            "reducers": srcPath + "/Reducers/",
            "actions": srcPath + "/Actions/",
            "helpers" : srcPath + "/Helpers/"
        }
    },
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
}
