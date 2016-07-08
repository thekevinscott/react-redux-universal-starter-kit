import 'babel-polyfill';
import React from 'react';
import createStore from '../redux/create';
import ApiClient from '../helpers/ApiClient';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
import useScroll from 'scroll-behavior/lib/useStandardScroll';

import getRoutes from '../shared/routes';

import renderIntoDOM from './renderIntoDOM.jsx';

const client = new ApiClient();
const _browserHistory = useScroll(() => browserHistory)();
const store = createStore(_browserHistory, client, window.__data);
const history = syncHistoryWithStore(_browserHistory, store);

const render = (props) => (
  <ReduxAsyncConnect
    {...props}
    helpers={{client}}
    filter={item => !item.deferred}
  />
);

const component = (
  <Router
    render={render}
    history={history}
  >
    {getRoutes(store)}
  </Router>
);

const dest = document.getElementById('content');

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

renderIntoDOM(component, store, dest);
