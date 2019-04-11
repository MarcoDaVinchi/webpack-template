const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/',
};

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
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
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval-source-map',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.src,
    port: 8081,
    compress: true,
    hot: true,
    watchContentBase: true,
    // overlay: {
    //   warnings: true,
    //   errors: true,
    // },
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
