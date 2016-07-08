export default () => {
  return new Promise((resolve) => {
    resolve({
      status: 404,
      payload: 'Not found'
    });
  });
}
