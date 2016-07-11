import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Home,
  Test,
} from 'shared/containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/test" component={Test} />
    </Route>
  );
};
