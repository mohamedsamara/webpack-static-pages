/* eslint-disable */
"use strict";

const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
// const PreloadWebpackPlugin = require("preload-webpack-plugin");

const helpers = require("./helpers");

const config = {
  entry: helpers.getEntry(),
  module: {
    rules: [
      // {
      //   enforce: "pre",
      //   test: /\.(js)$/,
      //   loader: "eslint-loader",
      //   exclude: /node_modules/,
      //   options: {
      //     emitWarning: process.env.NODE_ENV !== "production"
      //   }
      // },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    alias: {
      images: path.resolve(__dirname, "../", "src/public/images")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    // new PreloadWebpackPlugin({
    //   excludeHtmlNames: ["header.html"],
    //   include: "initial",
    //   as(entry) {
    //     if (/\.css$/.test(entry)) return "style";
    //     return "script";
    //   }
    // }),
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
};

helpers.getPageNames().forEach(page => {
  config.plugins.push(
    new HtmlWebPackPlugin({
      filename: `${page}.html`,
      template: `./src/pages/${page}/index.html`,
      chunks: [page],
      inject: true,
      favicon: path.resolve(__dirname, "../", "src/public/favicon.ico"),
      minify: process.env.NODE_ENV === "production"
    })
  );
});

module.exports = config;
