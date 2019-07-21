module.exports = app => {
  const views = require('koa-views');
  const json = require('koa-json');
  const onerror = require('koa-onerror');
  const bodyparser = require('koa-bodyparser');
  const static = require('koa-static');
  const logger = require('koa-logger');
  const path = require('path');
  const log4js = require('log4js');
  const request = require('../utils/request.config');

  log4js.configure({
    appenders: {
      cheese: {
        type: 'file',
        filename: './logs/server.log'
      }
    },
    categories: {
      default: {
        appenders: ['cheese'],
        level: 'error'
      }
    }
  });
  const logger4 = log4js.getLogger('cheese');

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
  app.use(request);
  //log4js
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      logger4.error(error);
      $log($chalk.red('错误 => logger4,' + error));
      // ctx.body = '错误';
    }
  });
};
