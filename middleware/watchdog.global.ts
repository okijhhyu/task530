import useUser from "~~/composables/useUser";

export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser()
  const allowedRoutes = ['/', '/login']
  if (user.value) {
    if (allowedRoutes.includes(to.path)) {
      return navigateTo('/private')
    }
  } else {
    if (!allowedRoutes.includes(to.path) && to.path !== '/api/auth/login' && to.path !== '/api/auth/callback') {
      return navigateTo('/login')
    }
  }
})