const Router = require('koa-router');
const requset = require('../../utils/requset.config');
const user = require('./user');

const registerDB = require('../module/user');
const jwt = require('jsonwebtoken');

const router = new Router({
  // prefix: '/api/v1'
});
router.use(async (ctx, next) => {
  let data = ctx.headers['access-token'],
    isExpire = false;
  if (data) {
    try {
      data = await registerDB.findOne({
        token: data
      });
      jwt.verify(data['token'], data['phone'], async function(err, decode) {
        if (err) {
          // log('登录信息过期');
          isExpire = true;

          return $state({
            ctx,
            msg: '登录信息已失效,请重新登录',
            status: 2,
            code: 401
          });
        } else {
          // log(decode);
        }
      });
    } catch (error) {
      return $state({ ctx, msg: error, status: 2 });
    }
  }
  !isExpire && (await next());
});

/**
 * 接口
 */
router.post('/user/login', user.login);
router.post('/user/register', user.register);
router.post('/user/msg', user.msg);

module.exports = router;
