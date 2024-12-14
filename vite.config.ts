import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 2000, // Set the limit in KB (e.g., 2000 KB = 2 MB)
    outDir: 'dist',

  }
})