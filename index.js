#!/usr/bin/env node
var fs = require('fs');

/* 
 * Attempt to parse .babelrc, which specifies
 * how we wish to transform our Javascript
 */
try {
  var babelrc = fs.readFileSync('./.babelrc');
  var parsedBabel = JSON.parse(babelrc)
  require('babel-register')(parsedBabel);
} catch (err) {
  throw new Error('Error parsing .babelrc: ' + err);
}
require('./src/server');
