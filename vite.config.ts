import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteMdData from './src'

export default defineConfig({
  root: 'dev',
  plugins: [vue(), ViteMdData({ path: './dev/posts/' })],
})
