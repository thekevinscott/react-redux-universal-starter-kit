import renderToDom from './renderToDom';

export default (store) => {
  return renderToDom({
    assets: webpackIsomorphicTools.assets(), 
    store
  });
};
