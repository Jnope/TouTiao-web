// webpack.config.js
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //引入插件
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
// const CopyPlugin = require("copy-webpack-plugin");
// const webpack = require("webpack");

module.exports = {
  // mode: "development", // 环境模式
  entry: path.resolve(__dirname, "./src/main.js"), // 打包入口
  // entry: "./src/main.js", // 打包入口
  output: {
    filename: "js/[name].js", // 打包完的静态资源文件名
    path: path.resolve(__dirname, "./dist"), // 打包出口
  },
  resolve: {
    // extensions: [".vue", ".js", ".json", "scss", "css"],
    alias: {//指定路径别名
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/, // 不编译node_modules下的文件
        loader: "babel-loader",
      },
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      // {
      //   test: /\.(scss|sass|css)$/,
      //   use: [
      //     { loader: MiniCssExtractPlugin.loader },
      //     "css-loader",
      //     "sass-loader",
      //     "postcss-loader",
      //     {
      //       loader: "sass-resources-loader",
      //       options: {
      //         resources: [
      //           "src/style/tools/index.scss", // 引入 mixins 和 functions 的文件
      //           "src/style/settings/var.scss", // 引入全局 SasS 变量的文件
      //         ],
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./public/index.html"), // 我们要使用的 html 模板地址
      filename: "index.html", // 打包后输出的文件名
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "index.css", //重命名输出的css文件，也可不写默认
    // }),
    new VueLoaderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "src/assets/"),
    //       to: path.resolve(__dirname, "dist/image/"),
    //     },
    //   ],
    // }),
    // new webpack({
    //   __VUE_PROD_DEVTOOLS__: false,
    //   __VUE_OPTIONS_API__: false,
    // }),
  ],
  // devtool: "eval-cheap-module-source-map",
  // devServer: {
  //   // contentBase: path.resolve(__dirname, "./dist"),
  //   // port: 8080,
  //   // open: true,
  //   // hot: true,
  //   // hotOnly:true
  //   // publicPath: "/",
  //   static: {
  //     directory: path.join(__dirname, "public"),
  //   },
  //   compress: true,
  //   port: 9000,
  //   hot: true,
  // },
};
