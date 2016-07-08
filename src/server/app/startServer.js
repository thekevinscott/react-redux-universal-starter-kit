/*
 * This kicks off the express server.
 */
import http from 'http';

export default (app, config) => {
  if (config.port) {
    const server = new http.Server(app);
    server.listen(config.port, err => {
      if (err) {
        console.error(err);
      }
      console.info(`App running on port ${config.port}`);
    });
  } else {
    throw new Error('Please specify a port');
  }
}
