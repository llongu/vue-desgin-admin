const UserDB = require('../server/models/user/schemaUser');
const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
  let data = ctx.headers['access-token'],
    isExpire = false;
  if (data) {
    data = await UserDB.registerDB.findOne({
      token: data
    });
    jwt.verify(data['token'], data['phone'], async function(err, decode) {
      if (err) {
        // $log('登录信息过期');
        isExpire = true;
        return $res({
          ctx,
          msg: '登录信息已失效,请重新登录',
          status: 2,
          code: 401
        });
      }
    });
  }
  !isExpire && (await next());
};
