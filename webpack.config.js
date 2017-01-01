var path = require('path');

var config = {
  context: path.join(__dirname, 'src/scripts'),
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
      include: __dirname + '/src/scripts',
      loaders: ['babel']
    }, {
      test: /\.scss/,
      // TBD: include: __dirname + '/src', 
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.html/,
      // TBD: include: __dirname + '/src', 
      loader: 'html'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack?optimizationLevel=7&interlaced=false'
      ]
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