const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: path.resolve(__dirname, './src/client.tsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.js',
  },

  module: {
    rules: [{
      test: /\.(js|ts)x?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: { browsers: ['last 2 chrome versions'] },
            debug: true,
          }],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
      },
      exclude: path.resolve(__dirname, './node_modules'),
    },
    {
      test: /\.tsx$/,
      use: 'ts-loader'
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ko/),
  ],
  devServer: {
    hot: true,
    host: "localhost",
    port: 8080,
    historyApiFallback:true,
  }
};