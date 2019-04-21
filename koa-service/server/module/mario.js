const mongoose = require('mongoose');

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

module.exports = MarioChar;
