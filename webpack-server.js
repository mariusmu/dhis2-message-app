'use strict'
const path = require('path');
const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const baseConf = require('./webpack.config.js');
const rht = require('react-hot-loader/webpack');
const hwp = require('html-webpack-plugin');
let devConf = baseConf;

devConf.module.loaders = [
    { test: /\.(jsx|js)?$/, loader: 'babel-loader', include: path.join(__dirname, 'app') },
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
    devConf.externals = [],
devConf.plugins = [
        new hwp({
            template: 'index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        ];

devConf.entry = [
  'webpack-dev-server/client?http://0.0.0.0:3000', 
  'webpack/hot/only-dev-server',
  'react-hot-loader/patch',
  __dirname + "/app/app.jsx", 
];



new devServer(webpack(devConf), {
    historyApiFallback: true,
    hot: true,
})
    .listen(3000, (err) => {
        if(err)
            console.log(err);
        
        console.log("Webpack dev-server running on port 3000");

    });
