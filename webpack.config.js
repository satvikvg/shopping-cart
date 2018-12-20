"use strict";
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const htmlPlugin = new HtmlWebPackPlugin({
  template: resolve(__dirname, "./public", "index.html"),
  filename: "./index.html"
});

module.exports = {
  entry: resolve(__dirname, "src") + "/index.js",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  plugins: [htmlPlugin]
};
