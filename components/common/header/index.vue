<template>
  <div class="header">
    <router-link to="/" class="header-logo link-normal">
      CMS
    </router-link>
    <breadrumbs />
    <div class="header-settings">
    </div>
  </div>
</template>
<script setup>
import Breadrumbs from '@/components/common/breadcrumbs/index.vue';
const user = computed(() => {
  return useState('user').value;
});
</script>
