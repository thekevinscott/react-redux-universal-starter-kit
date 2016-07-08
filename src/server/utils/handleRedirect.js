export default (res, redirectLocation) => {
  res.redirect(redirectLocation.pathname + redirectLocation.search);
}
