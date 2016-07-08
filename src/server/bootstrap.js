import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from '../config';
import compression from 'compression';
import path from 'path';
import createStore from '../redux/create';
import ApiClient from '../helpers/ApiClient';
import Html from '../helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import {Provider} from 'react-redux';
import getRoutes from '../routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
app.use(compression());

app.use(Express.static(path.join(__dirname, '..', 'static')));

import proxy from './proxy';
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

  const renderToDom = (assets, store, component) => {
    const domString = ReactDOM.renderToString(
      <Html
        assets={assets}
        store={store}
        component={component}
        />
    );
    return `<!doctype html>\n${domString}`;
  }

  function hydrateOnClient(res) {
    res.send(renderToDom(webpackIsomorphicTools.assets(), store));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient(res);
    return;
  }

  const renderHTMLPayload = (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient(res);
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = {
          userAgent: req.headers['user-agent']
        };

        res.send(renderToDom(webpackIsomorphicTools.assets(), store, component));
      });
    } else {
      res.status(404).send('Not found');
    }
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, renderHTMLPayload);
});

/* This can go into listen.js */
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('Please specify a port.');
}
