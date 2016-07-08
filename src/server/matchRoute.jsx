import PrettyError from 'pretty-error';
import { loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';

import {
  handleError,
  handleRedirect,
  handleNotFound,
  handleSuccess,
} from './handlers';

const pretty = new PrettyError();

const parseMatchedRoute = (error, redirectLocation, renderProps, client, req, store, isomorphicTools) => {
  if (redirectLocation) {
    return handleRedirect( redirectLocation);
  } else if (error) {
    console.error(`Routing error: ${pretty.render(error)}`);
    return handleError(store, isomorphicTools);
  } else if (renderProps) {
    global.navigator = {
      userAgent: req.headers['user-agent']
    };
    return handleSuccess(client, store, renderProps, isomorphicTools);
  }

  return handleNotFound();
}

export default (req, res, store, client, isomorphicTools) => {
  return (error, redirectLocation, renderProps) => {
    return parseMatchedRoute(error, redirectLocation, renderProps, client, req, store, isomorphicTools).then((parsedRoute) => {
      const {
        status,
        payload,
        redirect
      } = parsedRoute;

      if (redirect) {
        return res.redirect(redirect);
      }

      res.status(status);
      return res.send(payload);
    }).catch((err) => {
      console.error('error with route handler', err);
    });
  }
}
