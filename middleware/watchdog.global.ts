// Define a route middleware function that handles user authentication.
export default defineNuxtRouteMiddleware((to, from) => {
  // Get the 'user' state variable using 'useState'.
  const user = useState('user');

  // Define an array of allowed routes that do not require authentication.
  const allowedRoutes = ['/', '/login'];

  // Check if the user is authenticated.
  if (user.value) {
    // If the user is authenticated and tries to access an allowed route
    // other than the root ('/'), redirect to the root.
    if (allowedRoutes.includes(to.path) && to.path !== '/') {
      return navigateTo('/');
    }
  } else {
    // If the user is not authenticated and tries to access a route
    // that is not in the list of allowed routes, redirect to the login page.
    if (!allowedRoutes.includes(to.path)) {
      return navigateTo('/login');
    }
  }
});
