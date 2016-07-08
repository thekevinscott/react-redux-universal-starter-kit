import ReactDOM from 'react-dom/server';

const renderToDom = ({ assets, store, component }) => {
  const domString = ReactDOM.renderToString(
    <Html
      assets={assets}
      store={store}
      component={component}
    />
  );
  return `<!doctype html>\n${domString}`;
}
