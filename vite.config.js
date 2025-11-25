import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Documentation: https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⬇️ THIS IS THE IMPORTANT PART
  // It tells the server: "Treat .glb files like images/assets, don't try to read them as text."
  assetsInclude: ['**/*.glb'], 
})