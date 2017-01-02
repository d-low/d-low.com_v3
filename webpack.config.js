const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
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
    loaders: [{
      test: /\.js$/,
      include: __dirname + '/src/scripts',
      loaders: ['babel']
    }, {
      test: /\.scss$/,
      include: __dirname + '/src/styles',
      loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
    }, {
      test: /\.html/,
      // TBD: include: __dirname + '/src', 
      loader: 'html'
    }, {
      test: /\.ttf$/,
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
  plugins: [
    new ExtractTextPlugin('[name].css')
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
    extensions: ['', '.ttf', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  }
};
module.exports = config;