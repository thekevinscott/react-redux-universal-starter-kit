export default (redirectLocation) => {
  return new Promise((resolve) => {
    resolve({
      redirect: redirectLocation.pathname + redirectLocation.search
    });
  });
}
