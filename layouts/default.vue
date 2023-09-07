<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <aside-component />
    </el-aside>
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
<script setup>
import HeaderComponent from '@/components/common/header/index.vue'
import AsideComponent from '@/components/common/aside/index.vue'

</script>