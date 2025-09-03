// vite.config.js
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: '/',
  build: { outDir: 'docs' },

  server: { host: true, port: 5173, strictPort: true },
  preview: { host: true, port: 4173, strictPort: true },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // @ => /src
    },
  },

  css: {
    // PostCSS (Autoprefixer)
    postcss: {
      plugins: [autoprefixer()],
    },
    // SCSS: Variablen überall automatisch injizieren
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/scss/variables.scss" as *;',
      },
    },
  },
});
