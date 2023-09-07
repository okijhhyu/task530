<template>
  <div class="header">
    <router-link to="/" class="header-logo link-normal">
      CMS
    </router-link>
    <breadrumbs />
    <div class="header-settings">
      <a class="link-normal" :href="user ? '/api/auth/logout' : '/api/auth/login'">
        {{ user ? 'Sign out' : 'Sign in' }}
      </a>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadrumbs from '@/components/common/breadcrumbs/index.vue'
const user = computed(() => {
  return useState('user').value
})

// import { useAuth0 } from '@/composables/auth0';
// const { login, isAuthenticated, logout, user } = useAuth0()
// const auth = computed(() => { return isAuthenticated })
</script>