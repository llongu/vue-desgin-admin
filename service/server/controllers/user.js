const UserModels = require('../models/user');

class User {
  /**
   * login
   * @param {}
   * @returns {}
   */

  static async login(ctx) {
    try {
      return await UserModels.login(ctx);
    } catch (error) {
      return $res({ ctx, msg: error, status: 2 });
    }
  }

  /**
   * register
   * @param {}
   * @returns {}
   */
  static async register(ctx) {
    try {
      return await UserModels.register(ctx);
    } catch (error) {
      return $res({ ctx, msg: error, status: 2 });
    }
  }

  static async msg(ctx) {
    try {
      return await UserModels.msg(ctx);
    } catch (error) {
      return $res({ ctx, msg: error, status: 2 });
    }
  }
}

module.exports = User;
