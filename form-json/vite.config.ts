import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const path = require('path')

export default defineConfig({
  plugins: [
    vue(),
    vueJsx()
  ],
  alias: {
    '@': path.resolve(__dirname, './src')
  }
})
