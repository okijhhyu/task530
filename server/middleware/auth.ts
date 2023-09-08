import {getCookie} from 'h3';

// Define a request event handler
export default defineEventHandler((event) => {
  // Retrieve the AUTH0_COOKIE_NAME from runtime configuration
  const {AUTH0_COOKIE_NAME} = useRuntimeConfig();

  // Get the token from the cookie
  const token = getCookie(event, AUTH0_COOKIE_NAME);

  // Check if the request URL includes '/api/auth/'
  if (event.node.req.url?.includes('/api/auth/')) {
    // If it does, return without performing any further checks
    return;
  }

  // Check if the request URL includes '/api/' (API route)
  if (event.node.req.url?.includes('/api/')) {
    // Check if a valid token exists
    if (!token) {
      // If there is no valid token,
      // set the response status code to 401 (Unauthorized)
      event.node.res.statusCode = 401;

      // Write a 401 response and
      // message to indicate the user must be signed in to access the resource
      event.node.res.writeHead(401)
          .end('You must be signed in to access this resource.');
    }
  }
});
