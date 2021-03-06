/*
 * Configuration file for the express server.
 *
 * Sets up compression and static file serving.
 */
import compression from 'compression';
import express from 'express';
import path from 'path';

export default (app) => {
  app.use(compression());
  app.use(express.static(path.join(__dirname, '..', 'static')));
}
