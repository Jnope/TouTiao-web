const path = require("path");
const { merge } = require("webpack-merge");
const commonWebpackConfig = require("./webpack.common.js");
const portfinder = require("portfinder");

const devConfig = {
  // 开发环境的 webpack 配置项
  mode: "development", // 环境模式
  devtool: "eval-cheap-module-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    // contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    compress: true,
    port: 9000,
    hot: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(scss|sass)$/i,
            use: [
              "style-loader",
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
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
        ],
      },
    ],
  },
};
const devWebpackConfig = merge(commonWebpackConfig, devConfig);

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort(
    {
      port: 9000, // 默认1081端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
      stopPort: 65535, // maximum port
    },
    (err, port) => {
      if (err) {
        reject(err);
        return;
      }
      devWebpackConfig.devServer.port = port;
      resolve(devWebpackConfig);
    }
  );
});
