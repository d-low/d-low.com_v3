const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// TODO:
// 1) JS source maps are off by a few lines
// 2) Enable:
//    - autoprefixer via postcss
//    - Promise and fetch polyfills
//    - Image optimization (maybe?)
// 3) Production build
// 4) Does ESLINT work?

// Loaders for CSS modules
const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]__[local]'
    }
  },
  // {
  //   loader: 'postcss-loader',
  //   options: {
  //     autoprefixer: {
  //       browsers: ['last 2 versions']
  //     }
  //   }
  // }
];

const config = {
  entry: {
    app: './src/scripts/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'www'),
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        enforce: 'pre',
        include: __dirname + '/src/scripts',
        loader: 'eslint-loader', 
        exclude: /node_modules/,
        options: {
          configFile: './.eslintrc',
        },
      },
      {
        test: /\.js$/,
        include: __dirname + '/src/scripts',
        loader: 'babel-loader',
      }, 
      { 
        test: /\.css$/, 
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader: cssLoaders,
        }),
      }, 
      {
        test: /\.html/,
        loader: 'html-loader',
      }, 
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 50000,
        },
      }, 
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      ignoreOrder: true,
    }),
    // new webpack.ProvidePlugin({
    //   Promise: 'imports-loader?this=>global!exports?global.Promise!es6-promise',
    //   fetch: 'imports-loader?this=>global!exports?global.fetch!whatwg-fetch'
    // })
  ],
  resolve: {
    extensions: ['.css', '.js'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
};

module.exports = config;
