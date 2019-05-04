const registerMod = require('../module/user');
const state = require('../../utils/response.config.js');
class User {
  /**
   * 创建文章模型
   * @param data
   * @returns {Promise<*>}
   */

  static async login(ctx) {
    ctx.body = {
      code: 400,
      msg: 'error'
    };
    return ctx;
  }

  /**
   * register
   * @param form
   * @returns
   */
  static async register(ctx) {
    var req = JSON.parse(JSON.stringify(ctx.request.body));
    // log(chalk.red(req));

    //校验
    if (req.password !== req.password2) {
      return state({ ctx, msg: '密码不一致', status: 2 });
    }

    try {
      //查重
      let repeat = await registerMod.findOne({ email: req.email });

      if (repeat) {
        return state({ ctx, msg: '该账户已被注册！', status: 2 });
      }

      //入库 这里字段和获取的参数字段不一致 需重新声明
      let data = new registerMod({
        email: req.email,
        pwd: req.password,
        phone: req.mobile,
        code: req.captcha
      });

      const save = await data.save();
      // log(chalk.green(save));
      return state({ ctx, msg: '注册成功！' });
    } catch (error) {
      return state({ ctx, msg: error });
    }
  }
}

module.exports = User;
