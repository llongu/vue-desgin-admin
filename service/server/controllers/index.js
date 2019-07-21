const Router = require('koa-router');
const user = require('./user');

const router = new Router({
  prefix: '/api'
});

/**
 * 接口
 */

router.post('/user/login', user.login);
router.post('/user/register', user.register);
router.post('/user/msg', user.msg);

module.exports = router;
