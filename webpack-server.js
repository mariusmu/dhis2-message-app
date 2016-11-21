'use strict'

const webpack = require('webpack');
const devServer = require('webpack-dev-server');
const baseConf = require('./webpack-config/dev.js');

let devConf = baseConf;


new devServer(webpack(devConf), {
    historyApiFallback: true,
    hot: true,
})
.listen(3000, (err) => {
        if (err)
            console.log(err);

        console.log("Webpack dev-server running on port 3000");

    });
