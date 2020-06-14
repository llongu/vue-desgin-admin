'use strict';

process.env.NODE_ENV = 'development';

const baseWebpackConfig = require('../webpack.config.js');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
module.exports = merge(baseWebpackConfig, {
  mode: process.env.NODE_ENV,
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true, //不跳转
    contentBase: false, // since we use CopyWebpackPlugin.
    inline: true,
    compress: true,
    hot: true,
    host: '127.0.0.1',
    port: 9000,
    overlay: { warnings: false, errors: true },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: {
          '^/api': '' // 重写接口
        }
      }
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
