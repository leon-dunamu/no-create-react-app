const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const webpack = require('webpack');

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  target: isDevelopment ? 'web' : 'browserslist',
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
    },
    modules: [path.join(__dirname, 'src'), 'node_modules'],
  },
  devtool: 'inline-source-map',
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)/,
        use: ['file-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: path.join(__dirname, 'node_modules'),
        loader: 'babel-loader',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> 1% in KR'],
                },
                debug: true,
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-transform-runtime',
            [
              'module-resolver',
              {
                alias: {
                  '~/*': './src',
                },
              },
            ],
            isDevelopment && 'react-refresh/babel',
          ].filter(Boolean),
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack-react-start-kit',
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    noInfo: true,
    port: 3000,
    hot: true,
    writeToDisk: true,
    historyApiFallback: true,
    liveReload: true,
    watchContentBase: true,
  },
};
