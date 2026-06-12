import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libs
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/') || id.includes('react-helmet-async')) {
            return 'vendor';
          }
          // Split icon library
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          // Split large data files
          if (id.includes('src/app/data/')) {
            return 'data';
          }
        },
      },
    },
  },
})
