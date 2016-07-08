export default (res, client, store, renderProps) => {
  const helpers = {
    client
  };
  const serverArgs = {
    ...renderProps,
    store,
    helpers,
  };

  loadOnServer(serverArgs).then(() => {
    res.status(200);

    global.navigator = {
      userAgent: req.headers['user-agent']
    };

    const component = (
      <Provider store={store} key="provider">
        <ReduxAsyncConnect {...renderProps} />
      </Provider>
    );

    res.send(renderToDom({
      assets: webpackIsomorphicTools.assets(),
      store,
      component
    }));
  });
}
