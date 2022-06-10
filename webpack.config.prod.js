const { merge } = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prodConfig = {
  mode: "production", // 环境模式
  devtool: "cheap-module-source-map",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.(scss|sass)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          "css-loader",
          // {
          //   loader: 'sass-loader',
          //   options: {
          //     indentedSyntax: true,
          //     // sass-loader version >= 8
          //     sassOptions: {
          //       indentedSyntax: true
          //     }
          //   }
          // },
          'sass-loader',
          "postcss-loader",
          // {
          //   loader: "sass-resources-loader",
          //   options: {
          //     resources: [
          //       "src/style/tools/index.scss",
          //       "src/style/settings/var.scss",
          //     ],
          //   },
          // },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
    }),
  ]
};

module.exports = merge(commonWebpackConfig, prodConfig);
