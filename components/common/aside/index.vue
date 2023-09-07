<template>
  <el-menu
    ref="menu"
    default-active="1"
    class="el-menu-vertical-demo"
    unique-opened
  >
    <el-menu-item index="/">
      <img width="40px" height="40px" class="avatar-menu" src="https://www.longevityintime.org/static/logo/UA/Logo512x256.svg">
      <template #title>
        <span style="padding-left: 15px" class="avatar-menu__title">
          Main page
        </span>
      </template>
    </el-menu-item>
      <nuxt-link to="/modules" class="link">
        <el-menu-item>
          <template #title>
            Modules
          </template>
        </el-menu-item>
      </nuxt-link>
      <!-- <template
        v-for="(menu, idx) in menuItem"
      >
        <el-submenu
          v-if="menu.subItems"
          :key="idx"
          :index="menu.item.link"
        >
          <template #label>
            <i
              :class="menu.item.icon"
              @click="$router.push(`/${menu.item.link}`)"
            />

            <template #label>
              <router-link :to="`/${menu.item.link}`" class="link" :style="activeStyle(menu.item.link)">{{ menu.item.value }}</router-link>
            </template>
          </template>
          <el-menu-item-group v-if="menu.subItems">
            <router-link
              v-for="(item, subidx) in menu.subItems"
              :key="subidx"
              :to="`/${menu.item.link}/${item.link}`"
              class="link"
            >
              <el-menu-item :style="activeStyle(`${menu.item.link}/${item.link}`)">
                {{ item.value }}
              </el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <router-link v-else :key="idx" :to="`/${menu.item.link}`" class="link" :style="activeStyle(menu.item.link)">
          <el-menu-item :style="activeStyle(menu.item.link)">
            <i
              :class="menu.item.icon"
              @click="$router.push(`/${menu.item.link}`)"
            />
            <template #label>
              {{ menu.item.value }}
            </template>
          </el-menu-item>
        </router-link>
      </template> -->
  </el-menu>
</template>
<script setup>
</script>
