<template>
  <el-menu
    ref="menu"
    default-active="1"
    class="el-menu-vertical-demo"
    unique-opened
  >
    <nuxt-link to="/" class="link">
      <el-menu-item index="/">
        <img
          width="40px"
          height="40px"
          class="avatar-menu"
          src="https://www.longevityintime.org/static/logo/UA/Logo512x256.svg"
        >
        <template #title>
          <span style="padding-left: 15px" class="avatar-menu__title">
            Main page
          </span>
        </template>
      </el-menu-item>
    </nuxt-link>
    <nuxt-link to="/modules" class="link">
      <el-menu-item>
        <template #title>
          Modules
        </template>
      </el-menu-item>
    </nuxt-link>
    <nuxt-link
      v-for="item in modules"
      :key="item._id"
      :to="`/modules/${item.sectionName}`"
      class="link"
    >
      <el-menu-item>
        <template #title>
          {{ item.sectionName.charAt(0).toUpperCase()
            + item.sectionName.slice(1) }}
        </template>
      </el-menu-item>
    </nuxt-link>
  </el-menu>
</template>
<script setup>
import {useModulesStore} from '~/store/modules';
const modulesStore = useModulesStore();
if (!modulesStore.modulesList.length) {
  await nextTick(() =>{
    try {
      modulesStore.getModules();
    } catch (error) {
      console.error(error);
    }
  });
}
const modules = computed(() => {
  return Array.isArray(modulesStore?.modulesList?.data) ?
    modulesStore.modulesList.data : [];
});
</script>
