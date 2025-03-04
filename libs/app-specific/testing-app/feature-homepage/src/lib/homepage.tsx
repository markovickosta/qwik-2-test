import { PropsOf, component$ } from '@qwik.dev/core';

import { Link } from '@qwik.dev/router';

export const Homepage = component$((props: { 
	imageAttributes?: PropsOf<'image'>;
    pictureAttributes?: PropsOf<'picture'>;
}) => {
	return (
		<div class="flex flex-col">
			<h1 class="text-2xl">Homepage 👋</h1>
			<Link class="underline text-blue-600" href="/test">Go to Serbian test route</Link>
			<Link class="underline text-blue-600" href="/en/test/">Go to English test route</Link>
		</div>
	);
});
