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
  static async userInfo(id) {
    return await Article.findOne({
      where: {
        id
      }
    });
  }
}

module.exports = User;
