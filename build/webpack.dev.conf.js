var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var PwaManifestPlugin = require('pwa-manifest-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  output: {
    // necessary for the html plugin to work properly
    // when serving the html from in-memory
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new PwaManifestPlugin({
      name: 'VueGo Go Game',
      short_name: 'VueGo',
      start_url: 'index.html',
      description: 'VueGo - A Go Game written with VueJS',
      icon: path.resolve('src/assets/logo.png'),
      background_color: 'white',
      theme_color: '#3f51b5'
    }),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})
