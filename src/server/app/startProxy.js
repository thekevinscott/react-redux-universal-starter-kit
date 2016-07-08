/*
 * Sets up the proxy server for an external API.
 *
 * This doesn't do much right now,
 * so use your imagination.
 */
import httpProxy from 'http-proxy';

export default (app, config) => {
  const targetUrl = `http://${config.apiHost}:${config.apiPort}`;

  const proxy = httpProxy.createProxyServer({
    target: targetUrl,
  });

  // Proxy to API server
  app.use('/api', (req, res) => {
    proxy.web(req, res, {
      target: targetUrl
    });
  });

  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') {
      console.error('proxy error', error);
    }
    if (!res.headersSent) {
      res.writeHead(500, {'content-type': 'application/json'});
    }

    const json = {error: 'proxy_error', reason: error.message};
    res.end(JSON.stringify(json));
  });
}
