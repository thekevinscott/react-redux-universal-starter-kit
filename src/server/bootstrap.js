import express from 'express';
import React from 'react';
import config from '../config';

import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import {
  configure,
  proxy,
  listen,
  handleRoutes
} from './app';

const app = new express();

configure(app);
handleRoutes(app);
proxy(app, config);
listen(app, config);
