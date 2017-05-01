const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


const config = {
  entry: {
    app: './src/scripts/main.js',
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.join(__dirname, 'build'),
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
          name: '[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          hash: 'sha512',
          digest: 'hex',
          name: '[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].[contenthash:8].css',
      ignoreOrder: true,
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: 'd-low.com - The website of Mike DiLorenzo: Hikes and Travels in Colorado, Latin America, and on the CDT',
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
