import {
  hydrateOnClient
} from '../utils/';

export default (store) => {
  return new Promise((resolve) => {
    resolve({
      status: 500,
      payload: hydrateOnClient(store)
    });
  });
}
