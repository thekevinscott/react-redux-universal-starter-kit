/*
 * Entry point for the server.
 *
 * Defines constants, sets up piping,
 * and starts up the isomorphic
 * webpack server.
 */

import path from 'path';
import WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import toolConfig from '../../webpack/webpack-isomorphic-tools';
import bootstrap from './bootstrap';

const rootDir = path.resolve(__dirname, '../..');

/*
 * Isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  const pipingConfig = {
    //hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i,
  };
  const piping = require('piping');

  const fn = (reloader) => {
    reloader.on('reloaded', () => {
      console.log('Reloading server');
    });
  };

  if (!piping(pipingConfig, fn)) {
    console.error('Piping did not load');
  }
}

const isomorphicTools = new WebpackIsomorphicTools(toolConfig)
.development(__DEVELOPMENT__)
.server(rootDir, () => {
  bootstrap(isomorphicTools);
});
