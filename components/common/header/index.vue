<template>
  <div class="header">
    <router-link to="/" class="header-logo link-normal">
      CMS
    </router-link>
    <breadrumbs />
    <div class="header-settings">
      <span class="link-normal" @click="login()">
        Sign in
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadrumbs from '@/components/common/breadcrumbs/index.vue'
import { useAuth0 } from '@/composables/auth0';
const { login } = useAuth0()
</script>