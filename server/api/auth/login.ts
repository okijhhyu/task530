export default defineEventHandler(async (event) => {
  // Retrieve configuration values from runtime config
  const {
    AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
  } = useRuntimeConfig();

  // Build the login URL for the authentication provider (Auth0)
  const loginUrl =
  `${AUTH0_ISSUER_BASE_URL}/authorize?response_type=code&client_id=
  ${AUTH0_CLIENT_ID}&redirect_uri=${AUTH0_BASE_URL}
  /api/auth/callback&scope=openid%20profile%20email`;

  // Redirect the user to the generated login URL
  event.node.res.writeHead(302, {
    Location: loginUrl,
  }).end();
});
