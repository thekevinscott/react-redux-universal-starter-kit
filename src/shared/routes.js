import React from 'react';
import { Route } from 'react-router';
import {
  App,
} from 'shared/containers';

export default () => {
  return (
    <Route path="/" component={App} />
  );
};
