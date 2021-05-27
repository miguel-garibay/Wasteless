const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill','./client/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
            },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    publicPath: '/',
    port:8081,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    hot: true,
  },
  plugins: [],
  resolve: { extensions: ['.js', '.jsx'] },
};
