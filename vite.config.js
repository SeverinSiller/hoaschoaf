// vite.config.js
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        maintenance: resolve(__dirname, 'maintainence.html'),
      },
    },
  },

  server: { host: true, port: 5173, strictPort: true },
  preview: { host: true, port: 4173, strictPort: true },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // @ => /src
    },
  },

  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/scss/variables.scss" as *;',
      },
    },
  },
});
