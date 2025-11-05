import { Link } from '@qwik.dev/router';
import { component$ } from '@qwik.dev/core';
import { inlineTranslate } from 'qwik-speak';

export default component$(() => {
	const t = inlineTranslate();
	return (
		<div class="flex flex-col">
			<h1 class="text-2xl">Test route 👋</h1>
			<div>{t('testPage.test')}</div>
			<Link class="underline text-blue-600" href="/">
				Go to homepage
			</Link>
		</div>
	);
});
