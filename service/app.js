const Koa = require('koa');

const app = new Koa();
//db
require('./config/db');
//config
require('./config/global');

// middlewares
const middlewares = require('./middlewares')(app);
//routes
const index = require('./routes/index');
//controller
const controller = require('./server/controllers');

app.use(index.routes(), index.allowedMethods());

app.use(controller.routes(), controller.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error =>>> ', err, ctx);
});

module.exports = app;
