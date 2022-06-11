import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteMdBridge } from './src'

export default defineConfig({
  root: 'dev',
  plugins: [vue(), ViteMdBridge({ path: './dev/posts/'})],
})
