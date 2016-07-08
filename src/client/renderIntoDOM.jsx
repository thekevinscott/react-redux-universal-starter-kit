/*
 * Renders a component into the DOM,
 * given a specific destination div
 * and a store.
 *
 * If no dev tools are present, will
 * wrap the component in a surrounding div
 * to mimic the appearance of the dev tools.
 */
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
