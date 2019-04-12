const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const urlLoader = require('./loaders/url-loader');
const sassLoader = require('./loaders/sass-loader');
const baseWebpackConfig = require('./webpack.base.conf');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/',
};

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          urlLoader('assets/img/', 100),
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name][hash].[ext]',
          //     outputPath: 'assets/img/',
          //   },
          // },
        ],
      },
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
                path: `${PATHS.src}/js/postcssConfigDev/`,
              },
            },
          },
          sassLoader(true),
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     sourceMap: true,
          //   },
          // },
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
