import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // 相对路径构建，产物可放到任意静态目录 / 本地直接预览
  base: './',
})
