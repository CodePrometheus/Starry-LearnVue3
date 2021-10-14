import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const monacoEditorPlugin = require('vite-plugin-monaco-editor')
const prefix = `monaco-editor/esm/vs`
const path = require('path')

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    monacoEditorPlugin
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
