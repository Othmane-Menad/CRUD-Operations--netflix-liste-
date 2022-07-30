const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/js/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    watchFiles: ["./src/*"], //for reload page for html and css change
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
    open: {
      app: {
        name: "chrome",
      },
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/template.html",
    }),
  ],
};
