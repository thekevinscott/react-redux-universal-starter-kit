import { loadOnServer } from 'redux-async-connect';
import { Provider } from 'react-redux';

import {
  handleError,
  handleRedirect,
  handleNotFound,
  handleSuccess,
  hydrateOnClient,
} from './utils';

export default (res, store, client) => {
  return (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      handleRedirect(res, redirectLocation);
    } else if (error) {
      console.error(`Routing error: ${pretty.render(error)}`);
      handleError(res, store);
    } else if (renderProps) {
      handleSuccess(res, client, store, renderProps);
    } else {
      handleNotFound(res);
    }
  }
}

