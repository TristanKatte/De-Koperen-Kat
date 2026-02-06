import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [enhancedImages(),
			  sveltekit()],
	server: {
		fs: {
			allow: ['./slicemachine.config.json']
		}
	},
	build: {
		rollupOptions: {
			// ❗ voorkomt dat zware libraries duizenden keren in server functies komen
			external: [
				'@supabase/supabase-js',
				'@supabase/auth-js',
				'@supabase/storage-js'
			]
		}
	}
});
