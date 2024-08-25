import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        //changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    VitePWA({
      // injectRegister: 'auto',
      // registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      // workbox: {
      //   globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      // },
      // srcDir: "public",
      filename: "service-worker.js",
      strategies: "injectManifest",
      injectRegister: false,
      manifest: false,
      injectManifest: {
        injectionPoint: null,
      },
    })
  ],

});


