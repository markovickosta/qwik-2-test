import { Homepage } from '@qwik-2-test-workspace/homepage';
import { component$, useSignal } from '@qwik.dev/core';
import { type DocumentHead } from '@qwik.dev/router';

export default component$(() => {
	const isSearchMode = useSignal(false);

	return <Homepage isActive={isSearchMode} />;
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
