import { QRL, Signal, component$, useTask$ } from '@qwik.dev/core';

import { Link } from '@qwik.dev/router';

export const Homepage = component$((props: { test: Signal<{ activeIndex: number }>, onClick: QRL<() => void>}) => {

	useTask$(({ track }) => {
		track(() => props.test.value.activeIndex)
		console.log('homepage', props.test.value.activeIndex); // does not log when activeIndex is changed
	})

	return (
		<div class="flex flex-col">
			<h1 class="text-2xl">Homepage 👋</h1>
			<Link class="underline text-blue-600" href="/test">Go to Serbian test route</Link>
			<Link class="underline text-blue-600" href="/en/test/">Go to English test route</Link>
			{/* UI is not updated on button click */}
			<div>{props.test.value.activeIndex}</div>
			<button class="w-fit px-4 bg-green-300" onClick$={props.onClick}>+++</button>
		</div>
	);
});
