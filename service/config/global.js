const chalk = require('chalk');
global.chalk = chalk;
global.log = console.log;

const state = require('../utils/response.config.js');
global.$state = state;
