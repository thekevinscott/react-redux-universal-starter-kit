/*
 * This handles a successful request from a matched
 * route on the server.
 */
import React from 'react';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import { renderToDom } from '../utils';
import getReduxAsyncComponent from 'shared/redux/utils/getReduxAsyncComponent.jsx';

export default (store, client, renderProps, isomorphicTools) => {
  const serverArgs = {
    ...renderProps,
    store,
    helpers: {
      client
    },
  };

  return loadOnServer(serverArgs).then(() => {
    const component = (
      <Provider
        store={store}
      >
        {getReduxAsyncComponent(renderProps)}
      </Provider>
    );

    const payload = renderToDom({
      assets: isomorphicTools.assets(),
      store,
      component
    });

    return {
      status: 200,
      payload
    };
  });
}
