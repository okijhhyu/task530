<template>
  <div class="header">
    <router-link to="/" class="header-logo link-normal">
      CMS
    </router-link>
    <breadrumbs />
    <div class="header-settings">
      <span class="link-normal" @click="isAuthenticated ? logout() : login()">
        {{ isAuthenticated }}
        {{ user }}
        {{ isAuthenticated ? 'Sign out' : 'Sign in' }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadrumbs from '@/components/common/breadcrumbs/index.vue'
import { useAuth0 } from '@/composables/auth0';
const { login, isAuthenticated, logout, user } = useAuth0()
const auth = computed(() => { return isAuthenticated })
</script>