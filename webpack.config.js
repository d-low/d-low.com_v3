const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// Loaders for CSS modules
const cssLoaders = [
  'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
  'postcss-loader'
];

// Loaders for global SASS styles
// REVIEW: These may be removed in favor of CSS modules
const sassLoaders = [
  'css-loader?sourceMap',
  'postcss-loader',
  'sass-loader?includePaths[]=' + path.resolve(__dirname, './src')
];

const config = {
  entry: {
    app: './src/scripts/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'www')
  },
  module: {
    preLoaders: [{
      test: /\.js$/, 
      include: __dirname + '/src/scripts',
      loader: 'eslint-loader', 
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      include: __dirname + '/src/scripts',
      loaders: ['babel']
    }, {
      test: /\.scss$/,
      include: __dirname + '/src/styles',
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
    }, { 
      test: /\.css$/, 
      // include: __dirname + '/src',
      loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!'))
    }, {
      test: /\.html/,
      // TBD: include: __dirname + '/src', 
      loader: 'html'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 50000
      }
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?optimizationLevel=7&interlaced=false'
      ]
    }]
  },
  eslint: {
    configFile: './.eslintrc'
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      ignoreOrder: true
    }),
    new webpack.ProvidePlugin({
      Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    extensions: ['', '.css', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  }
};

module.exports = config;
