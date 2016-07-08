#!/usr/bin/env node
var fs = require('fs');

/* Attempt to parse .babelrc */
try {
  var babelrc = fs.readFileSync('./.babelrc');
  var parsedBabel = JSON.parse(babelrc)
  require('babel-register')(parsedBabel);
} catch (err) {
  throw new Error('Error parsing .babelrc: ' + err);
}

var path = require('path');
var rootDir = path.resolve(__dirname, '..');
/*
 * Isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
// An option for disabling server side rendering
global.__DISABLE_SSR__ = false;

if (__DEVELOPMENT__) {
  const pipingConfig = {
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  };
  var piping = require('piping');
  console.log('piping', piping);

  if (!piping(pipingConfig)) {
    console.error('piping did not load');
    //throw new Error('Error with piping config');
  }
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
.development(__DEVELOPMENT__)
.server(rootDir, function() {
  require('../src/server');
});
