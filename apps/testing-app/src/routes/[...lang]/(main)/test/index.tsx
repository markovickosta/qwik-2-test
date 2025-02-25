import { component$, useComputed$ } from '@qwik.dev/core';

import { Link } from '@qwik.dev/router';
import { inlineTranslate } from 'qwik-speak';

export default component$(() => {
	const t = inlineTranslate();

	const productTitle = useComputed$(() => {
		return 'Test title';
	});

	return (
		<div class="flex flex-col">
			<h1 class="text-2xl">Test route 👋</h1>
			<div>{t('home.test')}</div>
			<Link class="underline text-blue-600" href="/">
				Go to homepage
			</Link>
			<br />
			<img
				src="https://cdn.builder.io/api/v1/image/assets%2Ffe30f73e01ef40558cd69a9493eba2a2%2Ffdc08238cb4d49d48d3a468308992e15?format=webp&width=2000"
				alt={`${t('home.imageAlt.founded-product:')} ${productTitle.value}`}
				decoding="async"
				loading="lazy"
				width={500}
				height={275}
			/>
		</div>
	);
});
