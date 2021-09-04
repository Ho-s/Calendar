const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode : 'production',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: './client',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js',
  },

  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: { browsers: ['last 2 chrome versions'] },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: [
          'react-refresh/babel',
          '@babel/plugin-proposal-class-properties',
        ],
      },
      exclude: path.join(__dirname, 'node_modules'),
    },
    // { test: /\.tsx$/, use: 'ts-loader'}
  ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './index.html'})
  ],

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
},
  devServer: {
    hot: true,
    host: "localhost",
    port: 5500
  }
};