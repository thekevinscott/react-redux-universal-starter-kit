require('babel-polyfill');

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var strip = require('strip-loader');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '..'),
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  entry: {
    main: [
      './src/client/index.js'
    ]
  },
};
