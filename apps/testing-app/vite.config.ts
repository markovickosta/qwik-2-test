import { defineConfig } from 'vite';
import { join } from 'path';
import { partytownVite } from '@qwik.dev/partytown/utils';
import { qwikNxVite } from 'qwik-nx/plugins';
import { qwikRouter } from '@qwik.dev/router/vite';
import { qwikSpeakInline } from 'qwik-speak/inline';
import { qwikVite } from '@qwik.dev/core/optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	cacheDir: '../../node_modules/.vite/apps/testing-app',
	plugins: [
		qwikNxVite(),
		qwikVite({
			client: {
				outDir: '../../dist/apps/testing-app/dist',
			},
			ssr: {
				outDir: '../../dist/apps/testing-app/server',
			},
			tsconfigFileNames: ['tsconfig.json'],
		}),
		qwikRouter(),
		tsconfigPaths({ root: '../../' }),
		qwikSpeakInline({
			basePath: './',
			assetsPath: 'apps/testing-app/i18n',
			supportedLangs: ['sr', 'en'],
			defaultLang: 'sr',
		}),
		partytownVite({
			dest: join(
				__dirname,
				'../../dist/apps/testing-app/dist',
				'~partytown',
			),
		}),
	],
	server: {
		fs: {
			// Allow serving files from the project root
			allow: ['../../'],
		},
	},
	preview: {
		headers: {
			'Cache-Control': 'public, max-age=600',
		},
	},
	test: {
		globals: true,
		cache: {
			dir: '../../node_modules/.vitest',
		},
		environment: 'node',
		include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
	},
	optimizeDeps: {
		include: ['@auth/core'],
		exclude: ['qwik-speak'],
	},
	ssr: {
		noExternal: ['qwik-speak'],
	},
});
