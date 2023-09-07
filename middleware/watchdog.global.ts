export default defineNuxtRouteMiddleware((to, from) => {
  const user = useState('user')
  const allowedRoutes = ['/', '/login']
  if (user.value) {
    if (allowedRoutes.includes(to.path) && to.path !== '/') {
      return navigateTo('/')
    }
  } else {
    if (!allowedRoutes.includes(to.path)) {
      return navigateTo('/login')
    }
  }
})