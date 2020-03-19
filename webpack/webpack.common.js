/* eslint-disable */
'use strict';

const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const helpers = require('./helpers');

const config = {
  entry: helpers.getEntry(),
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          emitWarning: process.env.NODE_ENV !== 'production',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, '../', 'src/public/images'),
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/public/robots.txt',
        to: path.resolve(__dirname, '../', 'build'),
      },
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
  ],
};

helpers.getPageNames().forEach(page => {
  config.plugins.push(
    new HtmlWebPackPlugin({
      filename: `${page}.html`,
      template: `./src/pages/${page}/index.html`,
      chunks:
        process.env.NODE_ENV === 'production'
          ? [page, 'main', 'vendor', 'runtime']
          : [page, 'main'],
      inject: true,
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            }
          : false,
    }),
  );
});

config.plugins.push(
  new FaviconsWebpackPlugin({
    logo: './src/public/favicon.svg',
    mode: 'webapp',
    devMode: 'webapp',
    favicons: {
      appName: 'webpack-static-pages',
      appDescription: 'Basic webpack static pages starter',
      developerName: '',
      developerURL: null,
      background: '#fff',
      theme_color: '#4a68aa',
      icons: {
        coast: false,
        yandex: false,
      },
    },
    icons: {
      twitter: true,
      windows: true,
    },
  }),
);

module.exports = config;
