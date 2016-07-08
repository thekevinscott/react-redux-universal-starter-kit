import renderToDom from './renderToDom';

export default (store, assets) => {
  return renderToDom({
    assets,
    store
  });
};
