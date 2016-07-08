const config = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,

  ENV: process.env.NODE_ENV || 'development'
  //IS_DEVELOPMENT: process.env.NODE_ENV !== 'production',

  DISABLE_SERVER_RENDERING: process.env.DISABLE_SERVER_RENDERING || false,
};

module.exports = config;
