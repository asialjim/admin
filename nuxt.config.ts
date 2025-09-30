import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@element-plus/nuxt'
  ],
  elementPlus: {
    importStyle: 'css'
  },
  css: [
    'element-plus/dist/index.css'
  ],
  devtools: {
    enabled: true
  }
})