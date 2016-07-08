/*
 * This listens for any incoming requests
 * and routes them appropriately.
 */
import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { match } from 'react-router';

import ApiClient from 'shared/helpers/ApiClient';
import createStore from 'shared/redux/createStore';
import getRoutes from 'shared/routes';

import { hydrateOnClient } from '../utils';
import config from 'config';

import { loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';

import {
  handleError,
  handleRedirect,
  handleNotFound,
  handleSuccess,
} from '../handlers';


export default (app, isomorphicTools) => {
  /* 
   * Any incoming requests get routed through
   * the main function 
   */
  app.use(main(isomorphicTools));
}

const main = (isomorphicTools) => {
  return (req, res) => {
    if (__DEVELOPMENT__) {
      // Do not cache webpack stats: the script file would change since
      // hot module replacement is enabled in the development env
      isomorphicTools.refresh();
    }

    if (config.DISABLE_SERVER_RENDERING) {
      return res.send(hydrateOnClient(store, isomorphicTools.assets()));
    }

    const client = new ApiClient(req);
    const memoryHistory = createHistory(req.originalUrl);
    const store = createStore(memoryHistory, client);
    const history = syncHistoryWithStore(memoryHistory, store);

    return match({
      history,
      routes: getRoutes(store),
      location: req.originalUrl
    }, (error, redirectLocation, renderProps) => {
      return parseMatchedRoute(error, redirectLocation, renderProps, client, store, isomorphicTools).then((parsedRoute) => {
        const {
          status,
          payload,
          redirect
        } = parsedRoute;

        if (redirect) {
          return res.redirect(redirect);
        }

        res.status(status);
        return res.send(payload);
      }).catch((err) => {
        console.error('error with route handler', err);
      });
    });
  };
}

/*
 * Routes a match request to the appropriate handler.
 *
 * Every handler returns a promise, that will resolve with
 * either a redirect parameter, or a status and payload
 * parameter.
 */
const parseMatchedRoute = (error, redirectLocation, renderProps, client, store, isomorphicTools) => {
  if (redirectLocation) {
    return handleRedirect(redirectLocation);
  } else if (error) {
    console.error('Routing error', error);
    const payload = hydrateOnClient(store, isomorphicTools.assets());
    return handleError(store).then(response => ({
      ...response,
      payload
    }));
  } else if (renderProps) {
    return handleSuccess(store, client, renderProps, isomorphicTools);
  }

  return handleNotFound();
}
