import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/payment': 'http://localhost:3000', // Redirige solicitudes a tu backend
    },
  },
});