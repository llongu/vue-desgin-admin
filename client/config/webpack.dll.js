const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: [//不修改的包放这里先编译一次，做分离加快打包速度
    'vue/dist/vue.runtime.js',
    'vue-router',
    'vuex',
    ]
  },
  output: {
    path: path.join(__dirname, '../dist'), //放在项目的static/js目录下面
    filename: '[name].dll.js', //打包文件的名字
    library: '[name]_library' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, '../dist', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }),  
   
  ]
};

/** 
 *  package.json =>  "build:dll": "webpack --config config/webpack.dll.js",
 *  build.js => push this plugin ↓
 *
 *  new webpack.DllReferencePlugin({
            context: __dirname,
            // manifest就是我们第一步中打包出来的json文件
            manifest: require('../dist/vendor-manifest.json'),
    })
 */