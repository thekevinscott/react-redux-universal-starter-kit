import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from '../config';
import compression from 'compression';
import path from 'path';
import createStore from '../redux/create';
import ApiClient from '../helpers/ApiClient';
import Html from '../helpers/Html';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import getRoutes from '../routes';
import matchRoute from './matchRoute';

import {
  renderToDom,
  hydrateOnClient,
} from './utils';

import proxy from './proxy';

const app = new Express();
const server = new http.Server(app);
app.use(compression());

app.use(Express.static(path.join(__dirname, '..', 'static')));

proxy(app, config);

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory, client);
  const history = syncHistoryWithStore(memoryHistory, store);

  if (__DISABLE_SSR__) {
    return res.send(hydrateOnClient(store));
  }

  match({
    history,
    routes: getRoutes(store),
    location: req.originalUrl
  }, matchRoute(res, store, client));
});

import listen from './listen';
listen(server, config);
