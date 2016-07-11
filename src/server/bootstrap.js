/*
 * Bootstrap file for the Express server.
 *
 * Configures the app, sets up the proxy,
 * sets up the route listeners,
 * and finally starts the server.
 */

import Express from 'express';
//import React from 'react';
import config from 'config';

//import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import {
  configure,
  startProxy,
  startServer,
  handleRequests,
} from './app';

export default (isomorphicTools) => {
  const app = new Express();

  configure(app);
  startProxy(app, config);
  handleRequests(app, isomorphicTools);
  startServer(app, config);
};
