// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dutour-avocat.fr',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // Les pages en noindex n'ont pas à figurer au sitemap.
      filter: (page) =>
        !/\/(mentions-legales|politique-de-confidentialite)$/.test(
          page.replace(/\/$/, ''),
        ),
    }),
  ],
});
