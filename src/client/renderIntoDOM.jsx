import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

export default (component, store, destination) => {
  if (!window.devToolsExtension) {
    return ReactDOM.render(
      <Provider
        store={store}
      >
        <div>
          {component}
        </div>
      </Provider>,
      destination
    );
  }
  return ReactDOM.render(
    <Provider
      store={store}
    >
      {component}
    </Provider>,
    destination
  );
};
