import compression from 'compression';
import express from 'express';

export default (app) => {
  app.use(compression());
  app.use(express.static(path.join(__dirname, '..', 'static')));
}
