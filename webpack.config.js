const path = require("path");
const html = require("html-webpack-plugin");
module.exports = {
  entry: {
    index: "./src/index.js",
  },
  plugins: [new html({ title: "Todo" })],
  devtool: "inline-source-map",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.svg$/i, type: "asset/resource" },
    ],
  },
};
