const Router = require('koa-router');
const user = require('./user');

const router = new Router({
  // prefix: '/api/v1'
});

/**
 * 接口
 */
router.post('/user/login', user.login);

module.exports = router;
