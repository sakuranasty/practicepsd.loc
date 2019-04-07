module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js'
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
    ]
  },
  devtool: 'eval'
}