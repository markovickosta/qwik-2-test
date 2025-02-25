import { Homepage } from '@qwik-2-test-workspace/homepage';
import { component$ } from '@qwik.dev/core';
import { routeLoader$, type DocumentHead } from '@qwik.dev/router';

export const useTestLoader = routeLoader$(async () => {
	return [{ test: 'test' }];
});

export default component$(() => {
	const testSignal = useTestLoader();
	console.log('Initial signal value:', testSignal.value);

	return <Homepage testSignal={testSignal} />;
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
