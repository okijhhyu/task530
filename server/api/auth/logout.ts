export default defineEventHandler(async (event) => {
  // Retrieve configuration values from runtime config
  const { AUTH0_ISSUER_BASE_URL, AUTH0_CLIENT_ID, AUTH0_COOKIE_NAME, AUTH0_BASE_URL } = useRuntimeConfig()

  // Clear the user session
  event.context.session = null

  // Delete the Auth0 cookie to log the user out
  deleteCookie(event, AUTH0_COOKIE_NAME)

  // Redirect the user to the Auth0 logout URL
  event.node.res
    .writeHead(302, {
      Location: `${AUTH0_ISSUER_BASE_URL}/v2/logout?client_id=${AUTH0_CLIENT_ID}&returnTo=${AUTH0_BASE_URL}`
    })
    .end()
})