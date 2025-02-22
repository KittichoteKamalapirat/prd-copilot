export const urlResolver = {
  // public
  pricing: '/pricing',

  // only unauth users
  landingRoot: '/',
  login: '/login',
  register: '/register',

  // auth only
  appHome: '/app',
  subscription: '/subscription',
  success: '/success',
  cancel: '/cancel',
  prds: '/app/prds',
  prd: (id: string) => `/app/prds/${id}`,
}
