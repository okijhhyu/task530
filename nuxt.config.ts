// https://nuxt.com/docs/api/configuration/nuxt-config
// import vue from '@vitejs/plugin-vue'
const {
  AUTH0_BASE_URL,
  AUTH0_ISSUER_BASE_URL,
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_COOKIE_NAME
} = process.env

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
    AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_CLIENT_SECRET,
    AUTH0_COOKIE_NAME,
    public: {
      AUTH0_COOKIE_NAME
    }
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
  typescript: {
    strict: true,
    shim: false,
  },
  elementPlus: {
    icon: 'ElIcon',
    importStyle: 'scss',
    themes: ['dark'],
  },
})
