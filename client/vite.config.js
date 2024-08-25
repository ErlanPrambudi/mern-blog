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
  plugins: [react(), VitePWA({
    devOptions: {
      enabled: true
    },
    filename: "service-worker.js",
    strategies: "injectManifest",
    injectRegister: false,
    manifest: false,
    injectManifest: {
      injectionPoint: null,
    }
  })],

});


