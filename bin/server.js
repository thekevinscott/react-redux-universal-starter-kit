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
/*
 * Isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  const pipingConfig = {
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  };
  const piping = require('piping');

  if (!piping(pipingConfig)) {
    console.error('piping did not load');
    //throw new Error('Error with piping config');
  }
}

require('../src/server');
