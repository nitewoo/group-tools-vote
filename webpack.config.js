var path = require('path');

var relativeAssetsPath = './static/dist';
var assetsPath = path.join(__dirname, relativeAssetsPath);

module.exports = {
    entry: './src/index.js',
    output: {
        path: assetsPath,
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        //make sure port 8090 is used when launching webpack-dev-server
        // publicPath: 'http://localhost:8090/assets'
        publicPath: '/dist/'
    },
    devServer: {
        contentBase: "./src",
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },
    externals: {
        //don't bundle the 'react' npm package with our bundle.js
        //but get it from a global 'React' variable
        // 'react': 'React'
    }
}