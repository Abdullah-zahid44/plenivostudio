import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The canonical site URL comes from the SITE_URL environment variable so the
// same codebase can deploy to staging and production. Falls back to the
// Cloudflare Pages default subdomain.
const siteUrl = process.env.SITE_URL || 'https://digitali.pages.dev';

export default defineConfig({
  site: siteUrl,
  output: 'static',
  integrations: [sitemap()],
});
