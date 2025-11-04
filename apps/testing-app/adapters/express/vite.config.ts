import baseConfig from '../../vite.config';
import { extendConfig } from '@qwik.dev/router/vite';
import { nodeServerAdapter } from '@qwik.dev/router/adapters/node-server/vite';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['apps/testing-app/src/entry.express.tsx'],
		// external: ['@qwik-router-sw-register']
      },
    },
    plugins: [
      nodeServerAdapter({
        name: 'express',
        ssg: null,
      }),
    ],
  };
});
