import path from 'path';
import tool from 'webpack-isomorphic-tools';
import toolConfig from '../../webpack/webpack-isomorphic-tools';
import bootstrap from './bootstrap';
import config from '../config';

const rootDir = path.resolve(__dirname, '../..');

/*
 * Isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (config.ENV === 'development') {
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

const isomorphicTools = new tool(toolConfig)
.development(config.ENV === 'development')
.server(rootDir, () => {
  bootstrap(isomorphicTools);
});
