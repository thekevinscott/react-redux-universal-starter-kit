export default (server, config) => {
  if (config.port) {
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
