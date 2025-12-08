import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      edge: false,
      split: true // ✅ functie splitting inschakelen
    }),
    csrf: {
      checkOrigin: false
    }
  },

  preprocess: vitePreprocess()
};

export default config;
