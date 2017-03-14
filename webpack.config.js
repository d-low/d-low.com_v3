const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// TODO:
// 1) Soure map line numbering is off
// 2) Enable:
//    - Image optimization (maybe?)
// 3) Production build

const config = {
  entry: {
    app: './src/scripts/main.js',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'www'),
  },
  devtool: 'source-map',
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
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]'
              }
            },
            {
              loader: 'postcss-loader',
            },
          ],
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
    new webpack.ProvidePlugin({
      Promise: 'es6-promise',
    }),
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
