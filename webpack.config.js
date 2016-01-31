var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [ './public/js/index.jsx' ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      excluse: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'React boilerplate!',
    template: './public/index.html',
    inject: 'body'
  })],
  devServer: {
    contentBase: './build'
  }
}