const mongoose = require('mongoose');
// 创建模型
const Schema = mongoose.Schema;
//定义格式
const registerDB = mongoose.model(
  'register',
  new Schema({
    email: {
      type: String
    },
    pwd: {
      type: String
      // required: [true, 'Why no pwd?']
    },
    phone: String,
    countID: Number,
    _id: {
      type: 'Mixed'
    },
    token: String
  })
);

module.exports = { registerDB };
