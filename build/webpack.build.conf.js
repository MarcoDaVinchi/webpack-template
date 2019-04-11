const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
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
                path: `${PATHS.src}/js/postcss.config.js`,
              },
            },
          },
          // {
          //   loader: 'resolve-url-loader',
          //   options: {
          //     sourceMap: true,
          //   },
          // },
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
  plugins: [
    new MiniCssExtractPlugin({
      // filename: `${PATHS.assets}css/[name].css`,
      // filename: devMode ? `${PATHS.assets}css/[name].css` : `${PATHS.assets}css/[name].[hash].css`,
      // chunkFilename: devMode ? `${PATHS.assets}css/[id].css` : `${PATHS.assets}css/[id].[hash].css`,
      filename: 'assets/css/[name].[hash].css',
      chunkFilename: 'assets/css/[id].[hash].css',
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig);
});
