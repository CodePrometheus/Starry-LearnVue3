import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// @ts-ignore
const path = require('path')

export default defineConfig(({ mode }: ConfigEnv) => {
  // @ts-ignore
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        // @ts-ignore
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      host: '127.0.0.1',
      port: 3000,
      open: false,
      https: false,
      proxy: {
        '/api': {
          target: 'http://api.vikingship.xyz',
          changeOrigin: true
        }
      }
    }
  }
})
