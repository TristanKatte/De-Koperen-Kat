import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			edge: false,
			split: false
		}),

		// BELANGRIJK → anders probeert SvelteKit te prerenderen
		prerender: {
			entries: []
		},

		csrf: {
			checkOrigin: false
		}
	}
};

export default config;
