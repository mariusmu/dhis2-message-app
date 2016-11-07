const path = require('path');
const srcPath = path.resolve(__dirname, "./app");

module.exports = {
    context : __dirname + "/app",
    entry: "./app.jsx",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/assets"

    },
    module: {
            loaders: [
                {
                    test: /\.(js|jsx)$/,
                    loader: "babel",
                    exclude: /node_modules/,
                },

                {
                    test: /\.less$/,
                    loader: 'style!css!less',                    
                    exclude: /node_modules/,
                },
                  { 
                     test: /\.json$/,
                    loader: "json-loader",
                }

            ]
        },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            "components" : srcPath + "/Components/",
            "constants" : srcPath + "/Constants/",
            "services" : srcPath + "/Services/",
            "style" : srcPath + "/Style/",
            "reducers" : srcPath + "/Reducers/",
            "actions" : srcPath + "/Actions/"
        }
    },
    node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
},
}

