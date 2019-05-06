module.exports = function state({
  ctx,
  msg,
  data = {},
  code = 200,
  status = 1
}) {
  //status 1 正常 2 异常
  ctx.status = code;
  ctx.body = {
    code: code,
    status: status,
    msg: msg,
    data: data
  };
  return ctx;
};
