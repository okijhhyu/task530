import { ref, computed } from 'vue';
import { createAuth0Client } from '@auth0/auth0-spa-js';

let auth0;

const isAuthenticated = ref(false);
const user = ref(null);

async function initAuth0() {
  auth0 = await createAuth0Client({
    domain: 'dev-gzmmg20tykutpocn.us.auth0.com',
    clientId: 'ScLlKeBbLB8XvMbmtdzhViCDa9gmgs5G',
    authorizationParams: {
      redirect_uri: window.location.origin,
    }
  });

  isAuthenticated.value = await auth0.isAuthenticated();

  if (isAuthenticated.value) {
    user.value = await auth0.getUser();
  }
}

initAuth0();

export function useAuth0() {
  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    user: computed(() => user.value),

    async login() {
      try {
        await auth0.loginWithRedirect();
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },

    async logout() {
      try {
        await auth0.logout({ returnTo: window.location.origin });
      } catch (error) {
        console.error('Error logging out:', error);
      }
    },
  };
}