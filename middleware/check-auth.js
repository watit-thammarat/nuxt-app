export default ({ store, req }) => {
  console.log('[Middleware]: check auth');
  store.dispatch('initAuth', req);
};
