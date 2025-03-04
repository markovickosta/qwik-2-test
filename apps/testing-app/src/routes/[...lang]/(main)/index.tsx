import { Homepage } from '@qwik-2-test-workspace/homepage';
import { $, component$, useSignal } from '@qwik.dev/core';
import { type DocumentHead } from '@qwik.dev/router';

export default component$(() => {
	const test = useSignal({ activeIndex: 0 });

	const incrementActiveIndex = $(() => {
		test.value.activeIndex++;
		console.log(test.value.activeIndex); // log is correct
	});

	return <Homepage test={test} onClick={incrementActiveIndex} />;
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
