const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  //在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
  extensions: ['.js', '.vue', '.json'],
  //配置项通过别名来把原导入路径映射成一个新的导入路径
  alias: {
    //$ 符号来缩小范围到只命中以关键字结尾的导入语句
    //生产 => 开发
    vue$:
      process.env.NODE_ENV === 'production'
        ? 'vue/dist/vue.runtime.js'
        : 'vue/dist/vue.esm.js',
    //@==src
    '@': resolve('src')
  }
};
