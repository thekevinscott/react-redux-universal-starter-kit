import React from 'react';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import { renderToDom } from '../utils';

export default (store, client, renderProps, isomorphicTools) => {
  const helpers = {
    client
  };
  const serverArgs = {
    ...renderProps,
    store,
    helpers,
  };

  return loadOnServer(serverArgs).then(() => {
    const component = (
      <Provider
        store={store}
      >
        <ReduxAsyncConnect
          {...renderProps}
        />
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
