<template>
  <div class="header-breadcrumbs">
    <el-breadcrumb
      v-show="breadcrumbs.length"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="(item, idx) in breadcrumbs"
        :key="idx" :to="{ path: item.link }"
        class="breadcrumb"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import {useBreadcrumbsStore} from '~/store/breadcrumbs';

const breadcrumbsStore = useBreadcrumbsStore();

const route = useRoute();

// When the component is mounted, initially create the breadcrumbs
onMounted(() => {
  createBreadcrumbs();
});

// Function to create breadcrumbs based on the current route
const createBreadcrumbs = () => {
  if (route.path.length > 1) {
    // Split the route path into segments and filter out empty segments
    const links = route.path.split('/').filter(Boolean);
    const breadcrumbs = [];
    let currentPath = '';

    // Iterate through each route segment to build the breadcrumb trail
    for (const link of links) {
      currentPath += `/${link}`;
      const breadcrumb = {
        link: currentPath,
        title: link.charAt(0).toUpperCase() + link.slice(1),
      };
      breadcrumbs.push(breadcrumb);
    }

    // Set the breadcrumbs in the Breadcrumbs store, including a "Main" link
    breadcrumbsStore.setBreadcrumbs([{link: '/', title: 'Main'},
      ...breadcrumbs]);
  } else {
    // If the route path is empty, set the breadcrumbs with only a "Main" link
    breadcrumbsStore.setBreadcrumbs([{link: '/', title: 'Main'}]);
  }
};

// Watch for changes in the route path and update breadcrumbs accordingly
watch(() => route.path, (changeBreadcrumbs) => {
  createBreadcrumbs();
});

// Compute the breadcrumbs from the Breadcrumbs store
const breadcrumbs = computed(() => {
  return breadcrumbsStore.getBreadcrumbs;
});
</script>
