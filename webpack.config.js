const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
  favicon: "./src/images/favicon.ico",
});

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [htmlPlugin],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: { name: "/static/[name].[ext]" },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
  },
};
