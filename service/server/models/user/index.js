const UserDB = require('./schemaUser');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/*
  加密=原密码+截取部分密码做盐值 生成MD5 
*/
function createSalt(pwd = pwd + '') {
  return pwd.slice(2, pwd.length);
}

//生成MD5
function cryptPwd(password, salt) {
  var saltPassword = password + ':' + salt;
  // $log('原始密码：%s', password);
  // $log('加盐后的密码：%s', saltPassword);
  var md5 = crypto.createHash('md5');
  var result = md5.update(saltPassword).digest('hex');
  // $log('加盐密码的md5值：%s', result);
  return result;
}

class UserModels {
  constructor() {}

  static async login(ctx) {
    let req = ctx.request.body,
      data = null;
    //数据获取
    if (req.loginType == 'email') {
      data = await UserDB.registerDB.findOne({
        email: req.username
      });
      //获取到加盐密码
      req.password = cryptPwd(req.password, createSalt(req.password));
    }
    if (req.loginType == 'phone') {
      //验证码验证
      data = await UserDB.registerDB.findOne({
        phone: req.mobile
      });
    }

    //数据校验
    if (!data) {
      return $res({
        ctx,
        msg: '该账户不存在！',
        status: 2
      });
    }
    if (req.loginType == 'email' && data['pwd'] != req.password) {
      return $res({
        ctx,
        msg: '密码错误！',
        status: 2
      });
    }
    if (req.loginType == 'phone' && data['captcha'] != req.captcha) {
      // return $res({
      //   ctx,
      //   msg: '验证码错误！',
      //   status: 2
      // });
    }

    //数据生成 token
    let { email } = data;
    let key = data['phone']; //phone 密钥混淆
    let token = jwt.sign({ name: email }, key, {
      expiresIn: 60 * 30 //秒
    });

    //数据入库
    Object.assign(data, {
      token
    });
    await UserDB.registerDB.updateOne({ _id: data['_id'] }, data);
    $log(data);
    return $res({
      ctx,
      msg: '登录成功！',
      data: {
        id: data['_id'],
        email: data['email'],
        token: token
      }
    });
  }

  static async register(ctx) {
    var req = ctx.request.body;
    //校验
    if (req.password !== req.password2) {
      return $res({
        ctx,
        msg: '密码不一致',
        status: 2
      });
    }
    //查重
    if (
      (await UserDB.registerDB.findOne({
        email: req.email
      })) ||
      (await UserDB.registerDB.findOne({
        phone: req.mobile
      }))
    ) {
      return $res({
        ctx,
        msg: '该邮箱或手机已被注册！',
        status: 2
      });
    }
    //用户id自增样本
    let getID = await UserDB.registerDB.findByIdAndUpdate(
      {
        _id: 'userIDAdd'
      },
      {
        $inc: {
          countID: 1
        }
      },
      {
        new: true,
        upsert: true
      }
    );
    if (!getID) {
      getID = await new UserDB.registerDB({
        _id: 'userIDAdd',
        countID: 0
      }).save();
    }
    // $log($chalk.blue(getID));
    //md5
    req.password = cryptPwd(req.password, createSalt(req.password));
    //入库  字段和获取的字段不一致 需重新声明
    let data = await new UserDB.registerDB({
      _id: getID.countID,
      email: req.email,
      pwd: req.password,
      phone: req.mobile
    }).save();

    // $log($chalk.green(data));
    return $res({
      ctx,
      msg: '注册成功！'
    });
  }

  static async msg(ctx) {
    return $res({
      ctx,
      msg: '暂无信息',
      status: 2
    });
  }
}

module.exports = UserModels;
