import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import remarkCallouts from './src/plugins/remark-callouts.mjs';

export default defineConfig({
  // Implicit: domeniul academiei. Pe un fork (GitHub Pages pe un cont personal) se suprascriu din CI.
  site: process.env.SITE_URL || 'https://academia.peviitor.ro',
  base: process.env.BASE_PATH || '/',
  integrations: [
    icon({
      include: {
        bx: ['*'],
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkCallouts],
  },
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
