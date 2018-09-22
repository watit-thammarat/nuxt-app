export default ({ store, redirect }) => {
  console.log('[Middleware]: auth');
  if (!store.getters.isAuthenticated) {
    redirect('/admin/auth');
  }
};
