const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  // mode : 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: path.resolve(__dirname,'./src/client.jsx'),
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
        plugins: [
          'react-refresh/babel',
        ],
      },
      exclude: path.resolve(__dirname, './node_modules'),
    },
    {
      test: /\.tsx$/, 
      use: 'ts-loader'
    },
    {
      test:/\.css$/,
      use:['style-loader','css-loader'],
    }
  ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
  devServer: {
    hot: true,
    host: "localhost",
    port: 8080
  }
};