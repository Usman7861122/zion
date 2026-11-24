import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zionpt.com',
  redirects: { '/home-2': '/' },
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
