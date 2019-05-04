const mongoose = require('mongoose');

// 创建模型
const Schema = mongoose.Schema;
//定义格式
const register = new Schema({
  email: {
    type: String,
    required: [true, 'Why no email?']
  },
  pwd: {
    type: String,
    required: [true, 'Why no pwd?']
  },
  phone: String,
  code: String
});

const login = new Schema({
  email: {
    type: String,
    required: [true, 'Why no email?']
  },
  pwd: {
    type: String,
    required: [true, 'Why no pwd?']
  },
  phone: String,
  code: String
});
const registerDB = mongoose.model('register', register);
module.exports = registerDB;
