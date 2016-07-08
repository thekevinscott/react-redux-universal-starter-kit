import {
  hydrateOnClient
} from '../utils/';

export default (store, isomorphicTools) => {
  return new Promise((resolve) => {
    const payload = hydrateOnClient(store, isomorphicTools.assets());
    resolve({
      status: 500,
      payload,
    });
  });
}
