const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval-source-map',
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
