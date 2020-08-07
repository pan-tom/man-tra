const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!()\/).*/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            compact: false,
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  output: {
    path: __dirname + '/public',
    filename: 'app.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
    }),
    new ManifestPlugin(),
  ],
  resolve: {
    alias: {
      "react-native": "react-native-web"
    },
    extensions: [".web.js", ".js"],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    host: '192.168.56.128',
    hot: true,
  },
}
