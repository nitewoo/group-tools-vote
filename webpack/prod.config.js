var path = require('path');
var webpack = require('webpack');

var relativeAssetsPath = '../static/assets';
var assetsPath = path.join(__dirname, relativeAssetsPath);

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./isomorphic-tools.config'));

var host = 'localhost';
var port = 6060;

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: './src/index.js',
  output: {
    path: assetsPath,
    filename: 'bundle.js', //this is the default name, so you can skip it
    // at this directory our bundle file will be available
    publicPath: 'http://' + host + ':' + port + '/assets/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }, {
      test: /\.css$/,
      loaders: [
        "style/useable",
        "css?modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]",
        "autoprefixer?browsers=last 2 version"
      ]
    }, {
      test: /\.scss$/,
      loaders: [
        "style/useable",
        "css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]",
        "autoprefixer?browsers=last 2 version",
        "sass?outputStyle=expanded&sourceMap"
      ]
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240'
    }]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    webpackIsomorphicToolsPlugin
  ],
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    // 'react': 'React'
  }
}