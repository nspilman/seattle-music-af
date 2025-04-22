// @ts-check
import { defineConfig } from 'astro/config';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  // Enable server-side rendering
  output: 'server',

  adapter: netlify()
});