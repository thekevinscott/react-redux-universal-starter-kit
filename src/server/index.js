import path from 'path';
import tool from 'webpack-isomorphic-tools';
import toolConfig from '../../webpack/webpack-isomorphic-tools';

const rootDir = path.resolve(__dirname, '../..');

global.webpackIsomorphicTools = new tool(toolConfig)
.development(__DEVELOPMENT__)
.server(rootDir, () => {
  require('./bootstrap');
});
