/*
 * This handles errors from a matched route
 * on the server.
 */
export default (store) => {
  return new Promise((resolve) => {
    resolve({
      status: 500,
    });
  });
}
