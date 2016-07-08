module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,

  DISABLE_SERVER_RENDERING: process.env.DISABLE_SERVER_RENDERING || false,
};
