const registerDB = require('../module/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

/*
  加密：原密码+截取部分密码为盐值 生成MD5 
*/
function createSalt(pwd = pwd + '') {
  return pwd.slice(2, pwd.length);
}

function cryptPwd(password, salt) {
  // 密码“加盐”
  var saltPassword = password + ':' + salt;
  // log('原始密码：%s', password);
  // log('加盐后的密码：%s', saltPassword);

  // 加盐密码的md5值
  var md5 = crypto.createHash('md5');
  var result = md5.update(saltPassword).digest('hex');
  // log('加盐密码的md5值：%s', result);
  return result;
}

class User {
  /**
   * login
   * @param {}
   * @returns {}
   */

  static async login(ctx) {
    var req = JSON.parse(JSON.stringify(ctx.request.body));
    try {
      //验证
      let data = null;
      if (req.loginType == 'email') {
        data = await registerDB.findOne({ email: req.username });
        //加盐密码验证
        req.password = cryptPwd(req.password, createSalt(req.password));
      }
      if (req.loginType == 'phone') {
        data = await registerDB.findOne({ phone: req.mobile });
        //验证码验证
      }
      if (!data) {
        return $state({ ctx, msg: '该账户不存在！', status: 2 });
      }
      // log(data);
      if (req.loginType == 'email' && data['pwd'] != req.password) {
        return $state({ ctx, msg: '密码错误！', status: 2 });
      }
      if (req.loginType == 'phone' && data['captcha'] != req.captcha) {
        // return $state({ ctx, msg: '验证码错误！', status: 2 });
      }

      //生成token
      let { email } = data;
      let key = data['phone']; // 密钥混淆
      let token = jwt.sign({ name: email }, key, {
        expiresIn: 60 //秒
      });
      // log(token);

      //入库
      Object.assign(data, { token });
      // log(data);
      await registerDB.updateOne({ _id: data['_id'] }, data);

      return $state({
        ctx,
        msg: '登录成功！',
        data: {
          id: data['_id'],
          email: data['email'],
          token: token
        }
      });
    } catch (error) {
      return $state({ ctx, msg: error, status: 2 });
    }
  }

  /**
   * register
   * @param {}
   * @returns {}
   */
  static async register(ctx) {
    var req = JSON.parse(JSON.stringify(ctx.request.body));
    // log(chalk.red(req));

    //校验
    if (req.password !== req.password2) {
      return $state({ ctx, msg: '密码不一致', status: 2 });
    }

    try {
      //查重
      let repeat =
        (await registerDB.findOne({ email: req.email })) ||
        (await registerDB.findOne({ phone: req.mobile }));

      if (repeat) {
        return $state({ ctx, msg: '该邮箱或手机已被注册！', status: 2 });
      }
      //用户id自增样本
      let getID = await registerDB.findByIdAndUpdate(
        { _id: 'userIDAdd' },
        { $inc: { countID: 1 } },
        { new: true, upsert: true }
      );
      if (!getID) {
        getID = await new registerDB({
          _id: 'userIDAdd',
          countID: 0
        }).save();
      }
      // log(chalk.blue(getID));
      //md5
      req.password = cryptPwd(req.password, createSalt(req.password));
      //入库  字段和获取的字段不一致 需重新声明
      let data = await new registerDB({
        _id: getID.countID,
        email: req.email,
        pwd: req.password,
        phone: req.mobile
      }).save();

      // log(chalk.green(data));
      return $state({ ctx, msg: '注册成功！' });
    } catch (error) {
      return $state({ ctx, msg: error, status: 2 });
    }
  }

  static async recover(ctx) {}

  static async msg(ctx) {
    return $state({ ctx, msg: '信息未失效' });
  }
}

module.exports = User;
