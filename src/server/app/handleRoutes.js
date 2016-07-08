import createHistory from 'react-router/lib/createMemoryHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import ApiClient from '../../helpers/ApiClient';
import createStore from '../../redux/create';
import getRoutes from '../../routes';
import matchRoute from '../matchRoute';
import { match } from 'react-router';

import { hydrateOnClient } from '../utils';

export default (app) => {
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
}
