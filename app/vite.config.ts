import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Real theme illustrations (assets/themes/) and mascot SVGs (assets/mascot/)
// live at the repo root, one level above this app/ directory, so the AI
// Engineer's payload/ work and this app can both reference the same asset
// drop without either side duplicating ~30MB of PNGs into git a second time.
// fs.allow lets the dev server read them; asset imports in src/lib/assets.ts
// resolve them into the build normally since Vite's asset pipeline isn't
// restricted to files under root.
const repoRoot = path.resolve(__dirname, '..')

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Curious Cat',
        short_name: 'Curious Cat',
        description: 'A gamified, illustrated learning app for adult curiosity.',
        theme_color: '#1A1A1A',
        background_color: '#F9F6F0',
        display: 'standalone',
      },
    }),
  ],
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
})
