import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from "@astrojs/preact";
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  integrations: [preact(), mdx()],
  output: 'server',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    devImageService: 'sharp'
  }),
  site: 'https://mbcrosier.com',
  sitemap: true
});