import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      manifest: {
        name: 'NexTap',
        short_name: 'AppName',
        description: 'A description of your app.',
        theme_color: '#000000',
        icons: [
          {
            src: '/vite.svg',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/vite.svg',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
});

