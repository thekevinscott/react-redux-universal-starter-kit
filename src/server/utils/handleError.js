import hydrateOnClient from './hydrateOnClient';

export default (res, store) => {
  res.status(500);
  res.send(hydrateOnClient(store));
}
