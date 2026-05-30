import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: 'https://hoinsurance.com',
      dynamicRoutes: [
        '/',
        '/blog',
        '/blog/florida-homeowners-insurance-rate-increases-2025-2026',
        '/blog/citizens-insurance-depopulation-program-florida-2025',
        '/blog/hurricane-season-preparation-florida-homeowners-2025',
        '/blog/private-flood-insurance-vs-nfip-florida',
        '/blog/florida-insurer-non-renewal-what-to-do',
      ],
    }),
  ],
});
