import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import ViteMdData from './src'

export default defineConfig({
  root: 'dev',
  plugins: [
    vue(),
    ViteMdData({
      path: './dev/posts/',
      declaration: {
        optional: true,
        outDir: './dev/'
      }
    })
  ],
  test: {
    include: ['../test/**/*.spec.ts']
  }
})
