// https://nuxt.com/docs/api/configuration/nuxt-config
// import vue from '@vitejs/plugin-vue'
export default defineNuxtConfig({
  devtools: { enabled: true },
  // css
  css: ['~/assets/scss/index.scss', ],

  runtimeConfig: {
    dburl: process.env.DATABASE_URL,
    dbName: process.env.DBNAME,
    user: process.env.DBUSERNAME,
    pass: process.env.DBPASSWORD,
    authSource: process.env.DBAUTHSOURCE,
    mainPage: process.env.MAINPAGE
  },

  modules: [
    '@element-plus/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt'
  ],
  vite: {
    // vue: {
    //   customElement: true,
    // },
    // vueJsx: {
    //     mergeProps: true,
    // },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/element/index.scss" as element;`,
        },
      },
    }
  },
  // vue: {
  //   compilerOptions: {
  //     isCustomElement: (tag) => {
  //         return tag.includes('-');
  //     },
  //   },
  // },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
})
