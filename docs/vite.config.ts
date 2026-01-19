import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@kwami/ui/dist': resolve(__dirname, '../dist'),
      '@kwami/ui': resolve(__dirname, '..'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
});
