

module.exports = {
    context : __dirname + "/app",
    entry: "./app.jsx",

    output: {
        filename: "bundle.js",
        path: __dirname + "/dist/assets"

    },
    module: {
            loaders: [
			
		{ test: /\.json$/, loaders: ['json-loader'] },
                {
                    test: /\.(js|jsx)$/,
                    loader: "babel",
                    exclude: /node_modules/,
                },
				

            ]
        },
    resolve: {
        extensions: ['', '.js', '.jsx','.json']
    },
	node: {
  fs: "empty"
},
    alias: {
        "Components" : __dirname + "/app/Components"
    },
	
    watch: true


}
