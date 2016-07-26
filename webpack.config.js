var debug = process.env.NODE_ENV !=="production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: "./client/compiled/index.js",
  output: {
    path: __dirname + "/client/scripts",
    filename: "scripts.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
            presets: ['es2015', 'react']
        }
      }
    ]
  }
};