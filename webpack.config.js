module.exports = {
  entry: [ './public/js/index.jsx' ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      excluse: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react']
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/build',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './build'
  }
}