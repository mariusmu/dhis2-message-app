

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
                }

            ]
        },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    alias: {
        "Components" : __dirname + "/app/Components"
    }


}
