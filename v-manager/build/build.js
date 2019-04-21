'use strict'

process.env.NODE_ENV = 'production';

const baseWebpackConfig = require('../webpack.config.js');
const path = require('path');
const rm = require('rimraf');
const webpack = require('webpack');
const merge = require('webpack-merge');

//js 压缩
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//css 压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//plugin and loader time
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
//文件分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 

const devWebpackConfig=smp.wrap(merge(baseWebpackConfig,{
    mode:process.env.NODE_ENV,
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                // 允许并发
                parallel: true,
                // 开启缓存
                cache: true,
                uglifyOptions:{
                    warnings: false,
                    parse: {},
                    compress: {
                        // 删除所有的console语句    
                        drop_console: true,
                        // 把使用多次的静态值自动定义为变量
                        reduce_vars: true,
                    },
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output:  {
                        // 使输出的代码尽可能紧凑
                        beautify: false
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                }
            })
        ],
    },
    plugins: [
        new OptimizeCssAssetsPlugin(),
        // new BundleAnalyzerPlugin(),
    ]
}));


rm(path.resolve(__dirname, '../dist/static'),err=>{
    if (err) throw err
    //   console.log('dist/static 已删除');
    webpack(devWebpackConfig,(err, stats)=>{
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
            chunks: false,
            chunkModules: false
          }) + '\n\n');
    
    });
})

