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
    // NEW
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  }, // NEW Ends
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
        test: /\.s?css$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|ttf|eot|svg)$/,
        loader: "file-loader",
        options: { name: "/static/[name].[ext]" },
      },
    ],
  },
};
