import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
} from 'containers';

export default (store) => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
    </Route>
  );
};
