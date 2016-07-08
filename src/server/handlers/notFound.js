/*
 * This is a catch all, for when nothing is working
 * on a matched route on the server.
 */
export default () => {
  return new Promise((resolve) => {
    resolve({
      status: 404,
      payload: 'Not found'
    });
  });
}
