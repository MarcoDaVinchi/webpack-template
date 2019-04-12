const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  dist: path.resolve(__dirname, '../dist'),
  assets: 'assets/',
};

module.exports = {
  externals: {
    paths: PATHS,
  },
  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].[hash].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'cache-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              cacheDirectory: true,
              plugins: ['@babel/plugin-proposal-object-rest-spread'],
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader',
          },
        },
      },
      {
        test: /\.(html)$/,
        use: [
          // {
          //   loader: 'file-loader',
          //   options: {
          //     name: '[name].[ext]',
          //   },
          // },
          // {
          //   loader: 'extract-loader',
          // },
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src', 'img:src', 'link:href'],
              minimize: true,
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name][hash].[ext]',
      //         outputPath: 'assets/img/',
      //       },
      //     },
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         disable: false,
      //         mozjpeg: {
      //           progressive: true,
      //           quality: 65,
      //         },
      //         // optipng.enabled: false will disable optipng
      //         optipng: {
      //           enabled: true,
      //         },
      //         pngquant: {
      //           quality: '65-90',
      //           speed: 4,
      //         },
      //         gifsicle: {
      //           interlaced: false,
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [],
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.js',
    },
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new HardSourceWebpackPlugin.ExcludeModulePlugin({
      // HardSource works with mini-css-extract-plugin but due to how
      // mini-css emits assets, assets are not emitted on repeated builds with
      // mini-css and hard-source together. Ignoring the mini-css loader
      // modules, but not the other css loader modules, excludes the modules
      // that mini-css needs rebuilt to output assets every time.
      test: /mini-css-extract-plugin[\\/]dist[\\/]loader/,
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md4',
      hashDigest: 'base64',
      hashDigestLength: 8,
    }),
    new VueLoaderPlugin(),
    // new MiniCssExtractPlugin({
    //   // filename: `${PATHS.assets}css/[name].css`,
    //   filename: devMode ? `${PATHS.assets}css/[name].css` : `${PATHS.assets}css/[name].[hash].css`,
    //   chunkFilename: devMode ? `${PATHS.assets}css/[id].css` : `${PATHS.assets}css/[id].[hash].css`,
    //   // filename: `${PATHS.assets}css/[name].[hash].css`,
    //   // chunkFilename: `${PATHS.assets}css/[id].[hash].css`,
    // }),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      // hash: false,
      template: `${PATHS.src}/index.html`,
      filename: 'index.html',
    }),
    // new CopyWebpackPlugin([
    //   {
    //     from: `${PATHS.src}/img`,
    //     to: `${PATHS.assets}img`,
    //   },
    //   {
    //     from: `${PATHS.src}/static`,
    //     to: '',
    //   },
    // ]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        chunkFilter: (chunk) => {
          // Exclude uglification for the `vendor` chunk
          if (chunk.name === 'vendor') {
            return false;
          }
          return true;
        },
        cache: true,
        parallel: true,
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    runtimeChunk: 'single',
  },
};
