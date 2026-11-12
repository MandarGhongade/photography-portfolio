import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo-name>/; Vercel/local use the root.
const base = process.env.GH_PAGES ? '/photography-portfolio/' : '/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  server: { port: 3000, strictPort: true },
  preview: { port: 3000, strictPort: true },
})
