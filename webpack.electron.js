const path = require('path');

module.exports = {
  entry: './src/electron.ts',
  devtool: 'inline-source-map',
  output: {
    path: __dirname + '/build',
    filename: 'electron.js',
    libraryTarget: 'commonjs2'
  },
  target: "electron-main",
  /* node: {
    __dirname: false,
    __filename: false,
    fs: false
  }, */
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};