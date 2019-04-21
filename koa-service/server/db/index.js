const Koa = require('koa');
const app = new Koa();
const mongoose = require('mongoose');

// 连接数据库：[ip/域名]:[端口号(默认27017)]/[数据库(db)]
mongoose.connect('mongodb://localhost:27017');
mongoose.connection
  .once('open', function() {
    log(chalk.green('mongodb 连接成功！'));
  })
  .on('error', function(err) {
    log(chalk.green(`mongodb 连接失败： ${err}`));
  });
