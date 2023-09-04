<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>
        <div class="header">
          <header-component />
          </div>
        </el-header>
      <el-main>
        <el-scrollbar>
          <slot />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import HeaderComponent from '@/components/common/header/index.vue'

</script>