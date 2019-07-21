module.exports = function Response({
  ctx,
  msg,
  data = {},
  code = 200,
  status = 1
}) {
  /*  status 1 正常 2 异常
      code   401  登录信息失效
  */

  // ctx.status = code;
  ctx.body = {
    code: code,
    status: status,
    msg: msg,
    data: data
  };
  return ctx;
};
