<template>
  <el-menu
    ref="menu"
    default-active="1"
    class="el-menu-vertical-demo"
  >
    <nuxt-link to="/" class="link">
      <el-menu-item index="/">
        <template #title>
          <span style="padding-left: 15px" class="avatar-menu__title">
            Бункер
          </span>
        </template>
      </el-menu-item>
    </nuxt-link>
    <nuxt-link to="/modules" class="link">
      <el-menu-item>
        <template #title>
          Create game
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
