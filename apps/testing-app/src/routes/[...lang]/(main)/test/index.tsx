import { Link, routeLoader$ } from '@qwik.dev/router';

import { component$ } from '@qwik.dev/core';
import { inlineTranslate } from 'qwik-speak';

let k = 1;
export const useRouteLoader = routeLoader$(() => {
	console.log('route loader', k);
	return k++;
});

export default component$(() => {
	const t = inlineTranslate();
	return (
		<div class="flex flex-col">
			<h1 class="text-2xl">Test route 👋</h1>
			<div>{t('home.test')}</div>
			<Link class="underline text-blue-600" href="/">
				Go to homepage
			</Link>
		</div>
	);
});
