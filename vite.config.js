import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// './' permite desplegar tanto en https://<usuario>.github.io/<repo>/
// como en dominio propio o Cloudflare Pages sin romper rutas de assets.
export default defineConfig({
  plugins: [react()],
  base: './',
});
