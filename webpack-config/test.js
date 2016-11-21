const base = require('./base.js');
const webpack = require('webpack');
const path = require('path');

const loaders = base.module.loaders.splice(1);

base.context = path.resolve(__dirname, "../app");
base.entry = path.resolve(__dirname, "../app/app.jsx");
delete base.context;
//base.module.entry= path.resolve(__dirname + "app.jsx");
loaders.push({
    test: /\.(js|jsx)$/,
    loader: 'babel',
    include: [].concat([
        path.resolve(__dirname, '../app'),
        path.resolve(__dirname, '../test')
    ])
    
});
base.module.loaders = loaders;
console.log(loaders);
//process.exit();
base.externals = {
        "react" : "React",
        "react-dom" : "ReactDom"
};

module.exports = base;