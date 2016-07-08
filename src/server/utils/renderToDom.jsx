/*
 * This hydrates a given assets payload
 * and a store on the client.
 *
 */
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

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

/**
 * Component to render HTML on the server, wrapping
 * the string output of the route component.
 */
class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="en-us">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          <script src={assets.javascript.main} charSet="UTF-8"/>
        </body>
      </html>
    );
  }
}
