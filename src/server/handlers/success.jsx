import React from 'react';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';
import { renderToDom } from '../utils';

export default (client, store, renderProps) => {
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
      <Provider store={store} key="provider">
        <ReduxAsyncConnect {...renderProps} />
      </Provider>
    );

    const payload = renderToDom({
      assets: webpackIsomorphicTools.assets(),
      store,
      component
    });

    return {
      status: 200,
      payload
    };
  });
}
