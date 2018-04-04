const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    popup: path.join(__dirname, 'src/popup.ts'),
    options: path.join(__dirname, 'src/options.ts'),
    background: path.join(__dirname, 'src/background.ts')
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      // { test: /\.css$/, use: 'css-loader' },
      { test: /\.ts$/, use: 'ts-loader' }
    ]
  },
  plugins: [
    // minify
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
