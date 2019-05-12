module.exports = async function(ctx, next) {
  log(ctx);
  await next();
};
