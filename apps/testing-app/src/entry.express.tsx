/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Express HTTP server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.builder.io/docs/deployments/node/
 *
 */
import {
	createQwikRouter,
	type PlatformNode,
} from '@qwik.dev/router/middleware/node';
import render from './entry.ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
// import dotenv from 'dotenv';
// import { getMetricsMiddleware } from '@kokibyte-workspace/util-observability';

// const metricsMiddleware = getMetricsMiddleware();

// dotenv.config();

const MAX_AGE = process.env['CACHE_MAX_AGE'] || '1y';
const PUBLIC_APP_PREFIX = process.env['PUBLIC_APP_PREFIX'] || '';

declare global {
	interface QwikCityPlatform extends PlatformNode {}
}

// Directories where the static assets are located
const distDir = join(fileURLToPath(import.meta.url), '..', '..', 'dist');

const buildDir = join(distDir, PUBLIC_APP_PREFIX, 'build');
const assetsDir = join(distDir, PUBLIC_APP_PREFIX, 'assets');

// Allow for dynamic port
const PORT = process.env.PORT ?? 3000;

// Create the Qwik City Node middleware
const { router, notFound } = createQwikRouter({
	render,
	//   qwikRouterConfig,
	//   manifest,
	//   getOrigin(req) {
	//     // If deploying under a proxy, you may need to build the origin from the request headers
	//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto
	//     const protocol = req.headers['x-forwarded-proto'] ?? 'http';
	//     // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host
	//     const host = req.headers['x-forwarded-host'] ?? req.headers.host;
	//     return `${protocol}://${host}`;
	//   },
	//   checkOrigin: false,
});

// Create the express server
// https://expressjs.com/
const app = express();

// Enable gzip compression
// app.use(compression());

// Prometheus metrics
// app.use(metricsMiddleware);

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use(
	`/build`,
	express.static(buildDir, { immutable: true, maxAge: MAX_AGE }),
);
app.use(
	`/assets`,
	express.static(assetsDir, { immutable: true, maxAge: MAX_AGE }),
);
app.use(express.static(distDir, { redirect: false }));

// Use Qwik City's page and endpoint request handler
app.use(router);

// Use Qwik City's 404 handler
// TWIG: This is basically useless. We catch all routes and handle them. We are redirecting to 404 if needed
app.use(notFound);

// Start the express server
app.listen(PORT, () => {
	console.log(`Server started: http://localhost:${PORT}/`);
});
