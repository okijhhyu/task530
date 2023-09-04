<template>
  <div class="header-breadcrumbs">
    <el-breadcrumb v-show="breadcrumbs.length" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(item, idx) in breadcrumbs" :key="idx" :to="{ path: item.link }" class="breadcrumb">
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { useBreadcrumbsStore } from '~/store/breadcrumbs'
import { useRoute } from 'vue-router'

const breadcrumbsStore = useBreadcrumbsStore()

const route = useRoute()
const createBreadcrumbs = () => {
  if (route.path.length > 1) {
    const links = route.path.split('/').filter(Boolean)
    const breadcrumbs = []
    let currentPath = ''

    for (const link of links) {
      currentPath += `/${link}`
      const breadcrumb = {
        link: currentPath,
        title: link.charAt(0).toUpperCase() + link.slice(1),
      }
      breadcrumbs.push(breadcrumb)
    }

    // Use the Pinia store to update breadcrumbs
    breadcrumbsStore.setBreadcrumbs([{ link: '/', title: 'Main' }, ...breadcrumbs])
  } else {
    // Use the Pinia store to update breadcrumbs
    breadcrumbsStore.setBreadcrumbs([{ link: '/', title: 'Main' }])
  }
}

const breadcrumbs = computed(() => {
  // Access the breadcrumbs from the Pinia store using getters
  return breadcrumbsStore.getBreadcrumbs
})

watch(route, () => {
  createBreadcrumbs()
})

onMounted(() => {
  createBreadcrumbs()
})
</script>