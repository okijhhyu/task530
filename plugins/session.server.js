export default defineNuxtPlugin((nuxt) => {
  // Access the event object using useRequestEvent
  const event = useRequestEvent(nuxt);
  // Extract the session from the event context
  const {session} = event.context;

  // Check if a user session exists and set it to the 'user' state
  if (session && session.user) {
    // Initialize or update the 'user' state with the session user data
    useState('user', () => session.user || null);
  }
});
