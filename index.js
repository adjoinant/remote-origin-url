/*
 * remote-origin-url
 * https://github.com/jonschlinkert/remote-origin-url
 *
 * Copyright (c) 2014 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var ini = require('ini');
var chalk = require('chalk');
var findup = require('findup-sync');

var warn = chalk.yellow;

var origin = module.exports = function(dir) {
  var git = findup('.git/config', {cwd: dir || process.cwd()});
  var str = fs.readFileSync(git, 'utf8');
  try {
    return ini.parse(str);
  } catch(e) {
    e += '\n[remote-origin-url]: ' + warn('This probably means that a remote origin has not been defined for this repository yet.');
    return new Error(e);
  }
};

origin.url = function(dir) {
  return origin(dir)['remote "origin"'].url;
};