import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For GitHub Pages: set to '/<repo-name>/' if not using a custom domain
  // For Cloudflare Pages: leave as '/'
  base: '/',
  server: {
    allowedHosts: true,
  },
})
