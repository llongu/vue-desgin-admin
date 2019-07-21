const chalk = require('chalk');
global.$chalk = chalk;
global.$log = console.log;

const response = require('../utils/response.config.js');
global.$res = response;
