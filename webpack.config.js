var path = require('path');

var relativeAssetsPath = './static/assets';
var assetsPath = path.join(__dirname, relativeAssetsPath);

module.exports = {
    entry: './src/index.js',
    // context: path.resolve(__dirname, '.'),
    output: {
        path: assetsPath,
        filename: 'bundle.js', //this is the default name, so you can skip it
        //at this directory our bundle file will be available
        publicPath: 'http://localhost:8081/assets'
        // publicPath: '/assets/'
    },
    devServer: {
        contentBase: "./src",
        historyApiFallback: true
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