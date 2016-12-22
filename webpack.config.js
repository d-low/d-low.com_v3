var path = require('path');

var config = {
  context: path.join(__dirname, 'src'),
  entry: [
    './main.js'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: __dirname + '/src',
      loaders: ['babel']
    }, {
      test: /\.scss/,
      // TBD: include: __dirname + '/src', 
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.html/,
      // TBD: include: __dirname + '/src', 
      loader: 'html'
    }]
  },
  resolveLoader: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'node_modules')
    ]
  }
};
module.exports = config;