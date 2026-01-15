import { Homepage } from '@qwik-2-test-workspace/homepage';
import { component$, useStore, useTask$ } from '@qwik.dev/core';
import { routeLoader$, server$, type DocumentHead } from '@qwik.dev/router';

export const useRouteLoader = routeLoader$(() => {
	return { test: 'test' };
});

const serverFunction = server$((arg: { test: string }) => {
	console.log('serverFunction', arg);
	return arg;
});

export default component$(() => {
	const store = useStore({
		data: useRouteLoader().value,
	});

	useTask$(async () => {
		const server = await serverFunction(store.data);
		console.log('useTask', server);
	});

	return <Homepage />;
});

export const head: DocumentHead = {
	title: 'Welcome to Qwik',
	meta: [
		{
			name: 'description',
			content: 'Qwik site description',
		},
	],
};
