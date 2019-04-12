const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.conf');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/',
};

const buildWebpackConfig = merge(baseWebpackConfig, {
  // BUILD config
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name][hash].[ext]',
              outputPath: 'assets/img/',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              disable: false,
              mozjpeg: {
                progressive: true,
                quality: 65,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/',
              // hmr: process.env.NODE_ENV === 'development',
            },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${PATHS.src}/js/postcssConfigBuild/`,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  // devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      // filename: `${PATHS.assets}css/[name].css`,
      // filename: devMode ? `${PATHS.assets}css/[name].css` : `${PATHS.assets}css/[name].[hash].css`,
      // chunkFilename: devMode ? `${PATHS.assets}css/[id].css` : `${PATHS.assets}css/[id].[hash].css`,
      filename: 'assets/css/[name].[hash].css',
      chunkFilename: 'assets/css/[id].[hash].css',
    }),
    new CleanWebpackPlugin(),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
