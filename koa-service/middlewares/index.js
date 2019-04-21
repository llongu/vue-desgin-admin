module.exports = app => {
  const views = require('koa-views');
  const json = require('koa-json');
  const onerror = require('koa-onerror');
  const bodyparser = require('koa-bodyparser');
  const static = require('koa-static');
  const logger = require('koa-logger');
  const path = require('path');

  // error handler
  onerror(app);
  app.use(
    bodyparser({
      enableTypes: ['json', 'form', 'text']
    })
  );
  app.use(json());
  //logger
  app.use(logger());
  app.use(static(path.join(__dirname, '..', '/public')));

  app.use(
    views(path.join(__dirname, '..', '/views'), {
      extension: 'pug'
    })
  );
};
