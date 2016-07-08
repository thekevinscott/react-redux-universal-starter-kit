/*
 * This handles a redirect request from a matched
 * route on the server.
 */
export default ({ pathname, search }) => {
  return new Promise((resolve) => {
    resolve({
      redirect: pathname + search
    });
  });
}
