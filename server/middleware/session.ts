import Iron from '@hapi/iron'
import { getCookie } from 'h3'

// Define an event handler that runs asynchronously
export default defineEventHandler(async (event) => {
  // Retrieve the AUTH0_COOKIE_NAME and AUTH0_CLIENT_SECRET from runtime configuration
  const { AUTH0_COOKIE_NAME, AUTH0_CLIENT_SECRET } = useRuntimeConfig()

  // Get the cookie from the incoming event
  const cookie = getCookie(event, AUTH0_COOKIE_NAME)

  // Check if there's a session object in the event context; if not, initialize it as an empty object
  if (!event.context.session) {
    event.context.session = {}
  }

  // Check if a valid cookie exists
  if (cookie) {
    // Attempt to unseal (decrypt) the cookie using the AUTH0_CLIENT_SECRET
    try {
      const { user } = await Iron.unseal(cookie, AUTH0_CLIENT_SECRET, Iron.defaults)

      // If successful, store the user information in the event's session context
      event.context.session.user = user
    } catch (error) {
      // Handle any decryption errors gracefully (e.g., log them)
      console.error('Error unsealing cookie:', error)
    }
  }
})
