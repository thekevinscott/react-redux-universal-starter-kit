var babelrc = require('fs').readFileSync('./.babelrc');

try {
  require('babel-register')(JSON.parse(babelrc));
} catch (err) {
  console.error('Error parsing .babelrc', err);
}
