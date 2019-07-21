const mocha = require('mocha');
const assert = require('assert');

const mongoose = require('mongoose');

describe('测试存储数据是否正常', function() {
  it('save data', function() {
    // 连接数据库：[ip/域名]:[端口号(默认27017)]/[数据库(db)]
    mongoose.connect('mongodb://localhost:27017');
    mongoose.connection
      .once('open', function() {
        // 创建模型
        const Schema = mongoose.Schema;
        //定义MarioCharSchema格式
        const MarioCharSchema = new Schema({
          name: String,
          weight: Number
        });
        //定义 Mario 表使用MarioCharSchema格式存储
        // const MarioChar = mongoose.model('Mario', { name: String });
        const MarioChar = mongoose.model('Mario', MarioCharSchema);

        let saveMario = new MarioChar({
          name: 'my name type is string'
        });
        saveMario.save().then(res => {
          console.$log(res);
          assert(1 + 1 === 3);
        });
      })
      .on('error', function(err) {
        $log($chalk.green(`mongodb 连接失败： ${err}`));
      });
  });
});
