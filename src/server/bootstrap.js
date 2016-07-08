import express from 'express';
import React from 'react';
import config from '../config';
import path from 'path';

import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';

import {
  renderToDom,
  hydrateOnClient,
} from './utils';

import proxy from './proxy';
import listen from './listen';
import handleRoutes from './handleRoutes';

const app = new express();

configureApp(app);
handleRoutes(app);
proxy(app, config);
listen(app, config);
