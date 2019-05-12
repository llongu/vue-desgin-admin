const Koa = require('koa');
const app = new Koa();
//config
require('./config/global');
//db
require('./server/db');

// middlewares
const middlewares = require('./middlewares')(app);
//routes
const index = require('./routes/index');
//controller
const controller = require('./server/controller');

//耗时
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  // log(chalk.red(`耗时---${ctx.method} ${ctx.url} - ${ms}ms`));
});
// routes
app.use(index.routes(), index.allowedMethods());

app.use(controller.routes(), controller.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
