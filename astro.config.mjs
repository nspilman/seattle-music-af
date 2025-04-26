// @ts-check
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Enable server-side rendering
  output: 'server',
  adapter: netlify(),
  integrations: [mdx()],
  
  // Configure markdown options
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});