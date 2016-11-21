const base = require('./base.js');
const webpack = require('webpack');;
const path = require('path');
const rht = require('react-hot-loader/webpack');
const hwp = require('html-webpack-plugin');
base.module.loaders = [
    { test: /\.(jsx|js)?$/, loader: 'babel-loader', include: path.join(__dirname, '../app') },
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
];
base.externals = [];

base.plugins = [
    new hwp({
        template: path.resolve(__dirname, "../app/index.tpl.html"),
        inject: 'body',
        filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];
base.entry = [
    'webpack-dev-server/client?http://0.0.0.0:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    path.resolve(__dirname, "../app/app.jsx"),
];


module.exports = base;
