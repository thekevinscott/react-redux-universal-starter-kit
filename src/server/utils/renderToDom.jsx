import React from 'react';
import Html from '../../helpers/Html';
import ReactDOM from 'react-dom/server';

export default ({ assets, component, store }) => {
  const domString = ReactDOM.renderToString(
    <Html
      assets={assets}
      component={component}
      store={store}
      />
  );
  return `<!doctype html>\n${domString}`;
};
