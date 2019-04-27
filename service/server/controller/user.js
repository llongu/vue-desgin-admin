const registerDB = require('../module/mario');
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
   * 查询取文章详情数据
   * @param id  文章ID
   * @returns {Promise<Model>}
   */
  static async register(ctx) {
    var data = JSON.parse(JSON.stringify(ctx.request.body));
    // log(chalk.red(data));
    //校验
    if (data.password !== data.password2) {
      ctx.status = 400;
      ctx.body = {
        code: 400,
        msg: '密码不一致！'
      };
      return ctx;
    }
    //查重

    try {
      //这里入库字段和获取的参数字段不一致 需重新声明
      let save = new registerDB({
        email: data.email,
        pwd: data.password,
        phone: data.mobile,
        code: data.captcha
      });
      //入库
      const res = await save.save();
      log(chalk.green(res));
      return (ctx.body = {
        code: 200,
        msg: '注册成功'
      });
    } catch (error) {
      return (ctx.body = {
        msg: error
      });
    }
  }
}

module.exports = User;
