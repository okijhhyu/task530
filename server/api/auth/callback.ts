import * as Iron from '@hapi/iron'
import { createRemoteJWKSet, jwtVerify } from 'jose'

export default defineEventHandler(async (event) => {
  // Retrieve configuration values from runtime config
  const {
    AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_COOKIE_NAME
  } = useRuntimeConfig()

  try {
    // Get query parameters from the event
    const query = getQuery(event)

    // Check for query errors or missing 'code' parameter
    if (query?.error || !query.code) {
      throw new Error(String(query.message))
    }

    // Prepare the authentication request body
    const body = JSON.stringify({
      grant_type: 'authorization_code',
      client_id: AUTH0_CLIENT_ID,
      client_secret: AUTH0_CLIENT_SECRET,
      code: query.code,
      redirect_uri: `${AUTH0_BASE_URL}/api/auth/callback`
    }).toString()

    // Send a POST request to obtain an access token and id token
    const data = await fetch(`${AUTH0_ISSUER_BASE_URL}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body
    })

    // Parse the response data
    const value = await data.json()

    // Create a JSON Web Key Set (JWKS) for token verification
    const JWKS = createRemoteJWKSet(new URL(`${AUTH0_ISSUER_BASE_URL}/.well-known/jwks.json`))

    // Verify the id token and extract user payload
    const { payload: user } = await jwtVerify(value.id_token, JWKS, {
      issuer: `${AUTH0_ISSUER_BASE_URL}/`
    })

    // Create a cookie object with user data and tokens
    const cookie = {
      user,
      id_token: value?.id_token,
      access_token: value?.access_token,
      scope: value?.scope,
      expires_in: value?.expires_in,
      token_type: value?.token_type
    }

    // Set the expiration date for the cookie
    const date = new Date()
    date.setDate(date.getDate() + 1)

    // Seal the cookie and set it as an HTTP cookie
    const sealedCookie = await Iron.seal(cookie, AUTH0_CLIENT_SECRET, Iron.defaults)
    setCookie(event, AUTH0_COOKIE_NAME, sealedCookie, {
      path: '/',
      secure: true,
      sameSite: 'lax',
      expires: date
    })

    // Redirect the user to the homepage
    event.node.res
      .writeHead(302, {
        Location: '/'
      })
      .end()
  } catch (error) {
    // Handle errors by setting the response status to errored
    event.node.res.errored
  }
})