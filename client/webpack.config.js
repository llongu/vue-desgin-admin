const webpack = require('webpack');
const path = require('path');

const resolveConfig = require('./config/resolve');

const HtmlWebpackPlugin = require('html-webpack-plugin');

//v15 plugin
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const compiler = require('vue-template-compiler');

//css 分离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//打包进度开启
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const ENV = process.env.NODE_ENV;

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'static/js/[name].[hash:8].build.js',
    chunkFilename: 'static/js/[name].[hash:8].js'
  },
  resolve: resolveConfig,
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/
      },
      {
        test: /.md$/,
        loader: 'text-loader'
      },
      {
        test: /(\.less|\.css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {

              // modifyVars: {},
              javascriptEnabled: true
            }
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/assets/css/main.less']
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
        exclude: /node_modules/
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['@babel/preset-env'],
              plugins: ['syntax-dynamic-import']
            }
          }

          // {
          //   loader: 'eslint-loader',
          //   enforce: 'pre',
          //   include: [path.resolve(__dirname, 'src')], // 指定检查的目录
          //   options: {

          //     // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
          //   }
          // }
        ]
      },

      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'static/img/[name].[hash:8].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader'
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/template/index.html',
      inject: true //script标签位于html文件的 body 底部
    }),
    new MiniCssExtractPlugin({

      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename:
        ENV !== 'production'
          ? 'static/css/[name].css'
          : 'static/css/[name].[hash:8].css',
      chunkFilename:
        ENV !== 'production'
          ? 'static/css/[id].css'
          : 'static/css/[id].[hash:8].css'
    })
  ]
};
