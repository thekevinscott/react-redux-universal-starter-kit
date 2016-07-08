/*
 * This handles errors from a matched route
 * on the server.
 */
import {
  hydrateOnClient
} from 'server/utils/';

export default (store) => {
  return new Promise((resolve) => {
    resolve({
      status: 500,
    });
  });
}
